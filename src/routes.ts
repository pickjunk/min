import { ComponentType } from 'react';
import qs from 'qs';
import { isBrowser } from './utils';

export type InitialProps = (match: {
  path: string;
  args?: Params;
  name?: string;
}) => Promise<object>;

export type Component<T> = ComponentType<T> & {
  initialProps?: InitialProps;
  _props?: object;
};

export type ImportComponent = () => Promise<Component<any>>;

export type Route = {
  name?: string;
  path?: string;
  directory?: string;
  component?: string;
  ssr?: boolean;

  _path?: string;
  _params?: string[];
  importComponent?: ImportComponent;

  children?: Route[];
};

type Names = {
  [key: string]: {
    pathTemplate: string;
    paramsRegex: {
      [key: string]: string;
    };
    paramsOptional: {
      [key: string]: boolean;
    };
  };
};

type MatchedRoute = [
  {
    path: string;
    importComponent: ImportComponent;
  }[],
  Params,
  string?,
];

export type Params = {
  [key: string]: string;
};

function getComponent(
  result: {
    path: string;
    importComponent: ImportComponent;
  }[],
  path: string,
  node: Route,
) {
  if (node.importComponent && (node.ssr || isBrowser())) {
    result.push({
      path,
      importComponent: node.importComponent,
    });
  }
}

function traverse(
  node: Route,
  context: {
    remain: string;
    routeGetComponents: {
      path: string;
      importComponent: ImportComponent;
    }[];
    routeArguments: Params;
  },
): MatchedRoute | false {
  // to avoid children's contexts affect each other
  // copy context
  let remain = context.remain;
  let routeGetComponents = [...context.routeGetComponents];
  let routeArguments = { ...context.routeArguments };

  let regex = new RegExp('^' + node._path, 'g');

  if (node._path) {
    let match = null;
    if ((match = regex.exec(remain))) {
      getComponent(routeGetComponents, match[0], node);

      for (let i = 1; i < match.length; i++) {
        // optional arguments will be matched as undefined
        // filter them
        if (match[i] !== undefined) {
          routeArguments[node._params![i - 1]] = match[i];
        }
      }

      // match has reached tail
      if (regex.lastIndex === remain.length) {
        let iterator = node;

        // if having children
        // search for default routes on the subtree
        while (iterator.children) {
          let defaultChild = null;

          for (let child of iterator.children) {
            if (child._path === undefined) {
              defaultChild = child;

              if (defaultChild.importComponent) {
                routeGetComponents.push({
                  path: '__default__',
                  importComponent: defaultChild.importComponent,
                });
              }

              break;
            }
          }

          // if having children but a default one can't be found
          // match will be fail.
          if (!defaultChild) return false;

          iterator = defaultChild;
        }

        return [routeGetComponents, routeArguments, iterator.name];
      }
    }
  } else {
    // a route without path (default route)
    // regarded as always matched
    // Note: This will perform as a deep-first tree search
    getComponent(routeGetComponents, '__default__', node);
  }

  if (node.children) {
    for (let child of node.children) {
      const result = traverse(child, {
        remain: remain.substr(regex.lastIndex),

        routeGetComponents,
        routeArguments,
      });

      if (result) {
        return result;
      }
    }
  }

  return false;
}

export interface LoadedRoute {
  route: {
    path: string;
    component: Component<any>;
  }[];
  args: Params;
  name?: string;
}

export interface Routes {
  data: Route;
  match(target: string): Promise<LoadedRoute | false>;
  check(target: string): boolean;
  link(name: string, args?: Params): string;
}

function simpleQuery(query: string) {
  const r: Params = {};
  query
    .split('&')
    .filter((o) => o)
    .forEach((o) => {
      const [k, v] = o.split('=');
      r[decodeURIComponent(k)] = decodeURIComponent(v);
    });
  return r;
}

export default function routes(data: Route, names: Names): Routes {
  return {
    data,
    async match(target) {
      let _tmp = target.split('?');
      let path = _tmp.shift() || '';
      let queryStr = _tmp.shift() || '';

      let root = data;
      let result = traverse(root, {
        remain: path,
        routeGetComponents: [],
        routeArguments: {},
      });

      // not match
      if (result === false) {
        return false;
      }

      let [routeGetComponents, args, name] = result;

      // actually import components
      const components = await Promise.all(
        routeGetComponents.map(({ importComponent }) => importComponent()),
      );

      const route = components.map((component, i) => ({
        path: routeGetComponents[i].path,
        component,
      }));

      // parse query string & merge args
      args = { ...simpleQuery(queryStr), ...args };

      // support initialProps
      await Promise.all(
        components.map((component) => {
          if (component.initialProps) {
            return component
              .initialProps({
                path,
                args,
                name,
              })
              .then((props) => {
                component._props = props || {};
              });
          }

          component._props = {};
        }),
      );

      return {
        route,
        args,
        name,
      };
    },
    check(target) {
      const path = target.split('?').shift() || '';
      const root = data;

      const result = traverse(root, {
        remain: path,
        routeGetComponents: [],
        routeArguments: {},
      });

      return Boolean(result);
    },
    link(name, args) {
      args = args || {};

      let pathname = '/';
      let queryObj: Params = {};

      let named = names[name];
      if (named) {
        // named route
        pathname = named.pathTemplate;

        for (let key in named.paramsOptional) {
          const value = args[key];

          if (named.paramsOptional[key] === false && value === undefined) {
            throw new Error(`argument [${key}] is required`);
          }

          let regex = new RegExp('^' + named.paramsRegex[key] + '$');
          if (value && regex.test(String(value)) === false) {
            throw new Error(
              `argument [${key}] is invalid, must match regexp [${named.paramsRegex[key]}]`,
            );
          }

          if (value === undefined) {
            pathname = pathname.replace(`(${key})`, '');
          } else {
            pathname = pathname.replace(
              `(${key})`,
              encodeURIComponent(String(value)),
            );
          }
        }

        // get query args (the args exclude route args)
        for (let key in args) {
          if (named.paramsOptional[key] === undefined) {
            queryObj[key] = args[key];
          }
        }
      } else {
        // path route
        pathname = name;
        queryObj = args;
      }

      return `${pathname}${qs.stringify(queryObj, { addQueryPrefix: true })}`;
    },
  };
}

// 用于支持 typescript 提示的 mock 方法
export function createRoutes(data: Route): Routes {
  return {
    data,
    async match(_) {
      return false;
    },
    check(_) {
      return false;
    },
    link(_, __) {
      return '';
    },
  };
}
