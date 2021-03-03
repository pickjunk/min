import React, {
  useState,
  useEffect,
  ReactElement,
  createContext,
  useContext,
} from 'react';
import { Subject } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import reduceRight from 'lodash/reduceRight';
import {
  Routes,
  LoadedRoute,
  Location,
  InitialProps,
  Component,
} from './routes';
import log from './logger';

export interface Match extends LoadedRoute {
  location: string;
}

export interface RouterContext extends Match {
  routes: Routes;
  loading: boolean;
}

let _routes: Routes | null = null;
const ctx = createContext<RouterContext | null>(null);
const location$ = new Subject<string>();

async function createRouter({
  routes,
  location = windowLocation(),
  notFound,
}: {
  routes: Routes;
  location?: string;
  notFound?: () => void;
}): Promise<React.FC<{}>> {
  _routes = routes;

  const route = await routes.match(location);
  if (route === false) {
    throw new Error('initial location must not be not found');
  }

  return function Router(): ReactElement {
    const [loading, setLoading] = useState<boolean>(false);
    const [match, setMatch] = useState<Match>({
      location,
      ...route,
    });

    useEffect(function () {
      const match$ = location$
        .pipe(
          switchMap(async function (l): Promise<Match | false> {
            let match = await routes.match(l);
            if (match === false) {
              log.warn({ path: l, status: '404' });
              if (notFound) {
                notFound();
              }
              return false;
            }
            log.info({ path: l, status: '200' });

            return {
              location: l,
              ...match,
            };
          }),
        )
        .pipe(filter((v) => Boolean(v)));

      const l = location$.subscribe(function () {
        setLoading(true);
      });
      const m = match$.subscribe(function (match) {
        setLoading(false);
        setMatch(match as Match);
      });

      return function () {
        l.unsubscribe();
        m.unsubscribe();
      };
    }, []);

    useEffect(function () {
      const originPopState = window.onpopstate;
      window.onpopstate = function () {
        location$.next(windowLocation());
      };

      return function () {
        window.onpopstate = originPopState;
      };
    }, []);

    const routeElement = reduceRight(
      match.route,
      (child: ReactElement | null, { path, component }) => {
        return React.createElement(
          component,
          { ...component._props, key: path },
          child,
        );
      },
      null,
    );

    return (
      <ctx.Provider
        value={{
          routes,
          loading,
          ...match,
        }}
      >
        {routeElement}
      </ctx.Provider>
    );
  };
}

export default createRouter;

export function push(location: Location): void {
  routesRequired();

  const target = _routes!.link(location);
  history.pushState(null, '', target);
  location$.next(target);
}

export function replace(location: Location): void {
  routesRequired();

  const target = _routes!.link(location);
  history.replaceState(null, '', target);
  location$.next(target);
}
export function go(delta?: number): void {
  routesRequired();

  history.go(delta);
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

function windowLocation(): string {
  return window.location.pathname + window.location.search;
}

export function initialProps(init: InitialProps) {
  return function (component: Component<any>) {
    component.initialProps = init;
    return component;
  };
}
