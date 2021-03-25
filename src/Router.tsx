import React, {
  useState,
  useEffect,
  ReactElement,
  createContext,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import reduceRight from 'lodash/reduceRight';
import { Routes, LoadedRoute, Location, Routing, Component } from './routes';
import log from './logger';
import { useTransition, animated } from 'react-spring';

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

function Page({ content, layer }: { content: LoadedRoute; layer: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const reachBottom = useCallback(
    function (cb: () => Promise<void>) {
      let lock = false;

      const page = ref.current!;
      async function listener() {
        if (
          !lock &&
          page.scrollHeight - page.scrollTop - page.clientHeight < 3
        ) {
          console.log('reach bottom');

          lock = true;
          try {
            await cb();
          } catch (_) {}
          lock = false;
        }
      }

      page.addEventListener('scroll', listener);
      return function unmount() {
        page.removeEventListener('scroll', listener);
      };
    },
    [ref],
  );

  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'auto',
        zIndex: layer,
      }}
      ref={ref}
    >
      {reduceRight(
        content.route,
        (child: ReactElement | null, { path, component, props }) => {
          return React.createElement(
            component,
            { ...props, key: path, reachBottom },
            child,
          );
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
    const [current, setCurrent] = useState<number>(0);
    const [stack, setStack] = useState<LoadedRoute[]>([initialRoute]);

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
            setStack([route]);
          } else {
            if (action == 'push') {
              setCurrent(current + 1);
              setStack([...stack.slice(0, current + 1), route]);
            } else {
              setStack([...stack.slice(0, current), route]);
            }
          }
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
          // back
          if (stack[current - 1]) {
            const back = link(stack[current - 1].location);
            if (back == windowLocation()) {
              setCurrent(current - 1);
              return;
            }
          }
          // forward
          if (stack[current + 1]) {
            const forward = link(stack[current + 1].location);
            if (forward == windowLocation()) {
              setCurrent(current + 1);
              return;
            }
          }
        }
      };

      return function () {
        window.onpopstate = originPopState;
      };
    }, []);

    const transitions = useTransition(
      stack.slice(1, current + 1).map((_, i) => i),
      (i) => i,
      {
        from: { transform: 'translate3d(100vw,0,0)' },
        enter: { transform: 'translate3d(0,0,0)' },
        leave: { transform: 'translate3d(100vw,0,0)' },
      },
    );

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
            <animated.div key={layer} style={props}>
              <Page content={stack[layer]} layer={layer} />
            </animated.div>
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
