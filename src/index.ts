import { FunctionComponent, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import createRouter, {
  replace,
  push,
  go,
  back,
  forward,
  link,
  useRouter,
  routing,
  windowLocation,
} from './Router';
import Link from './Link';
import routes, {
  Routes,
  Location as RouteLocation,
  Params as RouteParams,
} from './routes';
import log from './logger';
import { isBrowser } from './utils';
import NoSSR from './NoSSR';

export default async function app({
  routes,
  ssr,
  hydrate,
}: {
  routes: Routes;
  ssr: (
    router: FunctionComponent<{}>,
  ) => {
    jsx: ReactElement;
    callback?: (html: string) => string;
  };
  hydrate: (
    router: FunctionComponent<{}>,
  ) => {
    jsx: ReactElement;
    id: string;
    callback?: () => void;
  };
}) {
  // hydrate for browser
  if (isBrowser()) {
    const initialRoute = await routes.match(windowLocation());
    const Router = await createRouter({
      routes,
      initialRoute,
    });
    const { jsx, id, callback } = hydrate(Router);
    ReactDOM.hydrate(jsx, document.getElementById(id), callback);
  }

  // return for ssr
  return async function (location: string) {
    const initialRoute = await routes.match(location);
    const Router = await createRouter({
      routes,
      initialRoute,
    });
    const { jsx, callback } = ssr(Router);
    return {
      jsx,
      callback,
      isNotFound: routes.check(location),
    };
  };
}

const router = {
  replace,
  push,
  go,
  back,
  forward,
  link,
};

export {
  createRouter,
  router,
  useRouter,
  routes,
  routing,
  Link,
  NoSSR,
  log,
  RouteLocation,
  RouteParams,
};
