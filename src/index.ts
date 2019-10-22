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
import { Routes } from './routes';

type Render = (router: FunctionComponent<void>) => ReactElement;

export default function app({
  routes,
  render,
  afterRender,
  notFound,
}: {
  routes: Routes;
  render: Render;
  afterRender?: () => void;
  notFound: () => void;
}) {
  // wrap render
  async function wrapRender(path?: string) {
    const Router = await createRouter(routes, path, notFound);
    return render(Router);
  }

  // browser bootstap
  if (typeof document !== 'undefined') {
    wrapRender().then(function(page) {
      // @ts-ignore
      ReactDOM.hydrate(page, document, afterRender);
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

export { createRouter, router, useRouter, initialProps, Link };
