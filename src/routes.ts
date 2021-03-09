import { ComponentType } from 'react';
import qs from 'qs';
import { isBrowser } from './utils';
import NoSSR from './NoSSR';

export class Redirect {
  location: Location;
  constructor(location: Location) {
    this.location = location;
  }
}

export type Routing = (
  location: {
    path?: string;
    args?: Params;
    name?: string;
  },
  redirect: (location: Location) => Redirect,
) => Promise<RouteProps | Redirect | undefined>;

export type Component<T> = ComponentType<T> & {
  routing?: Routing;
};

export type ImportComponent = () => Promise<Component<any>>;

export type RouteNode = {
  name?: string;
  path?: string;
  directory?: string;
  component?: string;
  ssr?: boolean;

  _path?: string;
  _params?: string[];
  importComponent?: ImportComponent;

  children?: RouteNode[];
};

export type RouteNames = {
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

export type RouteData = {
  data: RouteNode;
  notFound: Location;
  names?: RouteNames;
};

export type MatchedRoute = [
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

export type RouteProps = {
  [key: string]: any;
};

export interface LoadedRoute {
  route: {
    path: string;
    component: Component<any>;
    props: RouteProps;
  }[];
  location: Location;
}

export interface Location {
  name?: string;
  path?: string;
  args?: Params;
}

function getComponent(
  result: {
    path: string;
    importComponent: ImportComponent;
  }[],
  path: string,
  node: RouteNode,
) {
  if (!node.importComponent) {
    return;
  }

  if (node.ssr) {
    result.push({
      path,
      importComponent: node.importComponent,
    });
  } else {
    result.push({
      path: '__NO_SSR__',
      importComponent: (async () => {
        return NoSSR;
      }) as ImportComponent,
    });
    if (isBrowser()) {
      result.push({
        path,
        importComponent: node.importComponent,
      });
    }
  }
}

function traverse(
  node: RouteNode,
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

export interface Routes {
  data: RouteData;
  match(target: string): Promise<LoadedRoute>;
  check(target: string): boolean;
  link(location: Location): string;
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

function redirect(location: Location) {
  return new Redirect(location);
}

export default function routes({ data, names, notFound }: RouteData): Routes {
  if (!data || !notFound) {
    throw new Error('invalid routes');
  }

  async function match(target: string) {
    while (true) {
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
        const href = link(notFound);
        if (href == target) {
          throw new Error('notFound page can not be not found!');
        }

        target = href;
        continue;
      }

      let [routeGetComponents, args, name] = result;

      // actually import components
      const components = await Promise.all(
        routeGetComponents.map(({ importComponent }) => importComponent()),
      );

      // parse query string & merge args
      args = { ...simpleQuery(queryStr), ...args };

      // get components props
      const routeGetProps = await Promise.all(
        components.map((component) => {
          if (component.routing) {
            return component.routing(
              {
                path,
                args,
                name,
              },
              redirect,
            );
          }
        }),
      );

      // redirect
      for (let p of routeGetProps) {
        if (p instanceof Redirect) {
          target = link(p.location);
          continue;
        }
      }

      const route = components.map((component, i) => ({
        path: routeGetComponents[i].path,
        component,
        props: routeGetProps[i] || {},
      }));

      return {
        route,
        location: { name, path, args },
      };
    }
  }

  function check(target: string) {
    const path = target.split('?').shift() || '';
    const root = data;

    const result = traverse(root, {
      remain: path,
      routeGetComponents: [],
      routeArguments: {},
    });

    return Boolean(result);
  }

  function link({ name, path, args }: Location) {
    args = args || {};

    let pathname = '/';
    let queryObj: Params = {};

    // named route
    if (names && name) {
      if (!names[name]) {
        throw new Error(`unknown named route [${name}]`);
      }

      const named = names[name];

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
    }

    // path route
    if (path) {
      pathname = path;
      queryObj = args;
    }

    return `${pathname}${qs.stringify(queryObj, { addQueryPrefix: true })}`;
  }

  return {
    data: {
      data,
      names,
      notFound,
    },
    match,
    check,
    link,
  };
}
