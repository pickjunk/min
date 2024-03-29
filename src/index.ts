import { FunctionComponent, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import createRouter, {
  replace,
  push,
  back,
  forward,
  link,
  onChange,
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
  likeApp = false,
}: {
  routes: Routes;
  ssr: (router: FunctionComponent<{}>) => {
    jsx: ReactElement;
    callback?: (html: string) => string;
  };
  hydrate: (router: FunctionComponent<{}>) => {
    jsx: ReactElement;
    id: string;
    callback?: () => void;
  };
  likeApp?: boolean;
}) {
  // hydrate for browser
  if (isBrowser()) {
    const initialRoute = await routes.match(windowLocation());
    const Router = await createRouter({
      routes,
      initialRoute,
      likeApp,
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
      likeApp,
    });
    const { jsx, callback } = ssr(Router);
    return {
      jsx,
      callback,
      notFound: !routes.check(location),
    };
  };
}

const router = {
  replace,
  push,
  back,
  forward,
  link,
  onChange,
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
