import { FunctionComponent, ReactElement } from 'react';
import createRouter, { replace, push, go, back, forward, link, useRouter, routing } from './Router';
import Link from './Link';
import routes, { Routes, Location as RouteLocation, Params as RouteParams } from './routes';
import log from './logger';
import NoSSR from './NoSSR';
export default function app({ routes, ssr, hydrate, }: {
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
}): Promise<(location: string) => Promise<{
    jsx: ReactElement<any, string | ((props: any) => ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
    callback: ((html: string) => string) | undefined;
    isNotFound: boolean;
}>>;
declare const router: {
    replace: typeof replace;
    push: typeof push;
    go: typeof go;
    back: typeof back;
    forward: typeof forward;
    link: typeof link;
};
export { createRouter, router, useRouter, routes, routing, Link, NoSSR, log, RouteLocation, RouteParams, };
