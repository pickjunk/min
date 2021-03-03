import { FunctionComponent, ReactElement } from 'react';
import createRouter, { replace, push, go, back, forward, link, useRouter, routing } from './Router';
import Link from './Link';
import { Routes, createRoutes as routes, Location as RouteLocation, Params as RouteParams } from './routes';
import log from './logger';
import NoSSR from './NoSSR';
export default function app({ routes, ssr, hydrate, notFound, }: {
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
    notFound: () => void;
}): (location: string) => Promise<{
    jsx: ReactElement;
    callback?: ((html: string) => string) | undefined;
}>;
declare const router: {
    replace: typeof replace;
    push: typeof push;
    go: typeof go;
    back: typeof back;
    forward: typeof forward;
    link: typeof link;
};
declare const stop: Promise<typeof import("./promise").STOP_VALUE>;
export { createRouter, router, useRouter, routes, routing, Link, NoSSR, log, RouteLocation, RouteParams, stop, };
