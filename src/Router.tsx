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
import PropTypes from 'prop-types';
import { Routes, LoadedRoute, Params } from './routes';

export interface Match extends LoadedRoute {
  location: string;
}

export interface RouterContext extends Match {
  routes: Routes;
  loading: boolean;
}

const ctx = createContext<RouterContext | null>(null);

const location$ = new Subject<string>();

function fromWindow(): string {
  return window.location.pathname + window.location.search;
}

let _routes: Routes | null = null;

type Props = {
  routes: Routes;
  notFound: () => void;
};

export function Router({ routes, notFound }: Props): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [match, setMatch] = useState<Match>({
    location: fromWindow(),
    route: [],
    args: {},
  });

  useEffect(function() {
    _routes = routes;

    const match$ = location$
      .pipe(
        switchMap(async function(l): Promise<Match | false> {
          let match = await routes.match(l);
          if (match === false) {
            notFound();
            return false;
          }

          return {
            location: l,
            ...match,
          };
        }),
      )
      .pipe(filter(v => Boolean(v)));

    const l = location$.subscribe(function() {
      setLoading(true);
    });
    const m = match$.subscribe(function(match) {
      setLoading(false);
      setMatch(match as Match);
    });

    const originPopState = window.onpopstate;
    window.onpopstate = function() {
      location$.next(fromWindow());
    };
    location$.next(fromWindow());

    return function() {
      l.unsubscribe();
      m.unsubscribe();

      window.onpopstate = originPopState;
    };
  }, []);

  const routeElement = reduceRight(
    match.route,
    (child: ReactElement | null, { path, component }) => {
      return React.createElement(component, { key: path }, child);
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
}

Router.propTypes = {
  routes: PropTypes.object.isRequired,
  notFound: PropTypes.func.isRequired,
};

export function useRouter() {
  return useContext(ctx);
}

function routesRequired() {
  if (!_routes) {
    throw new Error(
      `Router is not created, ` +
        `make sure to call Router(routes, notFound) in your bootstrap`,
    );
  }
}

export default {
  push(name: string, args?: Params): void {
    routesRequired();

    const target = _routes!.link(name, args);
    history.pushState(null, '', target);
    location$.next(target);
  },
  replace(name: string, args?: Params): void {
    routesRequired();

    const target = _routes!.link(name, args);
    history.replaceState(null, '', target);
    location$.next(target);
  },
  go(delta?: number): void {
    routesRequired();

    history.go(delta);
  },
  back(): void {
    routesRequired();

    history.back();
  },
  forward(): void {
    routesRequired();

    history.forward();
  },
};
