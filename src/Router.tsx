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

export interface Context {
  [key: string]: any;
}

export interface RouterLocation extends Location {
  context?: Context;
}

export interface RouterLoadedRoute extends LoadedRoute {
  context?: Context;
}

export interface RouterContext extends RouterLoadedRoute {
  loading: boolean;
  onShow: (cb: () => Promise<void> | void) => void;
}

export interface ReachHandler {
  (): Promise<void>;
}

let _routes: Routes | null = null;
const ctx = createContext<RouterContext | null>(null);
const location$ = new Subject<['push' | 'replace', RouterLocation]>();

function Page({
  route,
  loading,
  active,
  style = {},
}: {
  route: LoadedRoute;
  loading: boolean;
  active: boolean;
  style?: React.CSSProperties;
}) {
  function onShow(cb: () => Promise<void> | void) {
    useEffect(
      function () {
        if (active == true) {
          cb();
        }
      },
      [active],
    );
  }

  return (
    <ctx.Provider
      value={{
        ...route,
        loading,
        onShow,
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflowY: 'auto',
          background: '#f5f5f9',
          ...style,
        }}
      >
        {reduceRight(
          route.route,
          (child: ReactElement | null, { path, component, props }) => {
            return React.createElement(
              component,
              { ...props, key: path },
              child,
            );
          },
          null,
        )}
      </div>
    </ctx.Provider>
  );
}
const AnimatedPage = animated(Page);

async function createRouter({
  routes,
  initialRoute,
  likeApp,
}: {
  routes: Routes;
  initialRoute: RouterLoadedRoute;
  likeApp: boolean;
}): Promise<React.FC<{}>> {
  _routes = routes;

  return function Router(): ReactElement {
    const [loading, setLoading] = useState<boolean>(false);
    const state = useRef({
      stack: [initialRoute] as RouterLoadedRoute[],
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
            [string, RouterLoadedRoute]
          > {
            const path = routes.link(location);

            if (routes.check(path)) {
              log.info({ path, status: '200' });
            } else {
              log.warn({ path, status: '404' });
            }

            const route = await routes.match(path);

            return [
              action,
              {
                ...route,
                context: location.context,
              },
            ];
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
          location$.next([
            'push',
            {
              path: windowLocation(),
            },
          ]);
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

    const animatedPages = stack.slice(1, current + 1);
    const transitions = useTransition(animatedPages, {
      from: { x: 100 },
      enter: { x: 0 },
      leave: { x: 100 },
    });

    function active(i: number) {
      return stack.length - 1 == i;
    }

    return (
      <>
        <Page route={stack[0]} loading={loading} active={active(0)} />
        {transitions(({ x }, item, _, i) => {
          return (
            <AnimatedPage
              route={item}
              loading={loading}
              active={active(i)}
              style={{
                translateX: x.to((x) => `${x}vw`),
                zIndex: i + 1,
              }}
            />
          );
        })}
      </>
    );
  };
}

export default createRouter;

export function push(location: RouterLocation): void {
  routesRequired();

  const target = _routes!.link(location);
  history.pushState(null, '', target);
  location$.next(['push', location]);
}
export function replace(location: RouterLocation): void {
  routesRequired();

  const target = _routes!.link(location);
  history.replaceState(null, '', target);
  location$.next(['replace', location]);
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
