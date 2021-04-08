import React, {
  useState,
  useEffect,
  ReactElement,
  createContext,
  useContext,
  useRef,
} from 'react';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import reduceRight from 'lodash/reduceRight';
import { Routes, LoadedRoute, Location, Routing, Component } from './routes';
import log from './logger';
import { useTransition, animated } from 'react-spring';
import useForceUpdate from 'use-force-update';

export interface RouterContext extends LoadedRoute {
  routes: Routes;
  loading: boolean;
}

export interface ReachHandler {
  (): Promise<void>;
}

let _routes: Routes | null = null;
const ctx = createContext<RouterContext | null>(null);
const location$ = new Subject<['push' | 'replace', string]>();

function Page({
  content,
  layer,
  style = {},
}: {
  content: LoadedRoute;
  layer: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflowY: 'auto',
        zIndex: layer,
        background: '#f5f5f9',
        ...style,
      }}
    >
      {reduceRight(
        content.route,
        (child: ReactElement | null, { path, component, props }) => {
          return React.createElement(component, { ...props, key: path }, child);
        },
        null,
      )}
    </div>
  );
}

async function createRouter({
  routes,
  initialRoute,
  likeApp,
}: {
  routes: Routes;
  initialRoute: LoadedRoute;
  likeApp: boolean;
}): Promise<React.FC<{}>> {
  _routes = routes;

  return function Router(): ReactElement {
    const [loading, setLoading] = useState<boolean>(false);
    const state = useRef({
      stack: [initialRoute] as LoadedRoute[],
      current: 0,
    });

    const forceUpdate = useForceUpdate();

    useEffect(function () {
      const start = location$.subscribe(function () {
        setLoading(true);
      });
      const end = location$
        .pipe(
          switchMap(async function ([action, location]): Promise<
            [string, LoadedRoute]
          > {
            if (routes.check(location)) {
              log.info({ path: location, status: '200' });
            } else {
              log.warn({ path: location, status: '404' });
            }

            const route = await routes.match(location);

            return [action, route];
          }),
        )
        .subscribe(function ([action, route]) {
          setLoading(false);

          if (!likeApp) {
            state.current = {
              stack: [route],
              current: 0,
            };
          } else {
            const { stack, current } = state.current;
            if (action == 'push') {
              state.current = {
                stack: [...stack.slice(0, current + 1), route],
                current: current + 1,
              };
            } else {
              state.current = {
                stack: [...stack.slice(0, current), route],
                current,
              };
            }
          }

          forceUpdate();
        });

      return function () {
        start.unsubscribe();
        end.unsubscribe();
      };
    }, []);

    useEffect(function () {
      const originPopState = window.onpopstate;
      window.onpopstate = function () {
        if (!likeApp) {
          location$.next(['push', windowLocation()]);
        } else {
          const { stack, current } = state.current;
          // back
          if (stack[current - 1]) {
            const back = link(stack[current - 1].location);
            if (back == windowLocation()) {
              state.current.current--;
              forceUpdate();
              return;
            }
          }
          // forward
          if (stack[current + 1]) {
            const forward = link(stack[current + 1].location);
            if (forward == windowLocation()) {
              state.current.current++;
              forceUpdate();
              return;
            }
          }
        }
      };

      return function () {
        window.onpopstate = originPopState;
      };
    }, []);

    const { stack, current } = state.current;

    const transitions = useTransition(
      stack.slice(1, current + 1).map((_, i) => i),
      (i) => i,
      {
        from: { transform: 'translate(100vw, 0)' },
        enter: { transform: 'translate(0vw, 0)' },
        leave: { transform: 'translate(100vw, 0)' },
      },
    );

    const AnimatedPage = animated(Page);

    return (
      <ctx.Provider
        value={{
          routes,
          loading,
          ...stack[current],
        }}
      >
        <Page content={stack[0]} layer={0} />
        {transitions.map(({ item, props }) => {
          const layer = item + 1;
          return (
            <AnimatedPage
              key={layer}
              content={stack[layer]}
              layer={layer}
              style={props}
            />
          );
        })}
      </ctx.Provider>
    );
  };
}

export default createRouter;

export function push(location: Location): void {
  routesRequired();

  const target = _routes!.link(location);
  history.pushState(null, '', target);
  location$.next(['push', target]);
}
export function replace(location: Location): void {
  routesRequired();

  const target = _routes!.link(location);
  history.replaceState(null, '', target);
  location$.next(['replace', target]);
}
export function back(): void {
  routesRequired();

  history.back();
}
export function forward(): void {
  routesRequired();

  history.forward();
}
export function link(location: Location): string {
  routesRequired();

  return _routes!.link(location);
}

export function useRouter() {
  return useContext(ctx);
}

function routesRequired() {
  if (!_routes) {
    throw new Error(
      `Router is not created, ` +
        `make sure to render <Router /> in your bootstrap`,
    );
  }
}

export function windowLocation(): string {
  return window.location.pathname + window.location.search;
}

export function routing(init: Routing) {
  return function (component: Component<any>) {
    component.routing = init;
    return component;
  };
}
