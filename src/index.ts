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
import { Routes, createRoutes as routes } from './routes';
import log from './logger';

type Render = (router: FunctionComponent<{}>) => ReactElement;

export default function app({
  routes,
  render,
  afterSSR = (html) => html,
  afterHydrate,
  notFound,
}: {
  routes: Routes;
  render: Render;
  afterSSR: (html: string) => string;
  afterHydrate?: () => void;
  notFound: () => void;
}) {
  // wrap render
  async function wrapRender(path?: string) {
    const Router = await createRouter(routes, path, notFound);
    return render(Router);
  }

  // browser bootstap
  if (typeof document !== 'undefined') {
    wrapRender().then(function (page) {
      // @ts-ignore
      ReactDOM.hydrate(page, document, afterHydrate);
    });
  }

  // return for ssr
  return [wrapRender, afterSSR];
}

const router = {
  replace,
  push,
  go,
  back,
  forward,
  link,
};

export { createRouter, router, useRouter, routes, initialProps, Link, log };
