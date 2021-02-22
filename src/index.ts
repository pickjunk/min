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

type Render = (
  router: FunctionComponent<{}>,
) => {
  jsx: ReactElement;
  afterSSR?: (html: string) => string;
  afterHydrate?: () => void;
};

export default function app({
  routes,
  render,
  notFound,
}: {
  routes: Routes;
  render: Render;
  notFound: () => void;
}) {
  // wrap render
  async function wrapRender(path?: string) {
    const Router = await createRouter(routes, path, notFound);
    return render(Router);
  }

  // browser bootstap
  if (isBrowser()) {
    wrapRender().then(function ({ jsx, afterHydrate }) {
      // @ts-ignore
      ReactDOM.hydrate(jsx, document, afterHydrate);
    });
  }

  // return for ssr
  return wrapRender;
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
  log,
  RouteLocation,
  RouteParams,
};
