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
  initialProps,
} from './Router';
import Link from './Link';
import {
  Routes,
  createRoutes as routes,
  Location as RouteLocation,
  Params as RouteParams,
} from './routes';
import log from './logger';
import { isBrowser } from './utils';
import NoSSR from './NoSSR';

export default function app({
  routes,
  ssr,
  hydrate,
  notFound,
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
  notFound: () => void;
}) {
  // hydrate for browser
  if (isBrowser()) {
    createRouter({ routes, notFound })
      .then(function (Router) {
        return hydrate(Router);
      })
      .then(function ({ jsx, id, callback }) {
        ReactDOM.hydrate(jsx, document.getElementById(id), callback);
      });
  }

  // return for ssr
  return async function (location: string) {
    const Router = await createRouter({ routes, location });
    return ssr(Router);
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
  initialProps,
  Link,
  NoSSR,
  log,
  RouteLocation,
  RouteParams,
};
