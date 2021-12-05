import { FunctionComponent, ReactElement } from 'react';
import createRouter, { replace, push, back, forward, link, onChange, useRouter, routing } from './Router';
import Link from './Link';
import routes, { Routes, Location as RouteLocation, Params as RouteParams } from './routes';
import log from './logger';
import NoSSR from './NoSSR';
export default function app({ routes, ssr, hydrate, likeApp, }: {
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
}): Promise<(location: string) => Promise<{
    jsx: ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    callback: ((html: string) => string) | undefined;
    notFound: boolean;
}>>;
declare const router: {
    replace: typeof replace;
    push: typeof push;
    back: typeof back;
    forward: typeof forward;
    link: typeof link;
    onChange: typeof onChange;
};
export { createRouter, router, useRouter, routes, routing, Link, NoSSR, log, RouteLocation, RouteParams, };
