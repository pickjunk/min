import { FunctionComponent, ReactElement } from 'react';
import createRouter, { replace, push, go, back, forward, link, useRouter, initialProps } from './Router';
import Link from './Link';
import { Routes, createRoutes as routes, Params as RouteParams } from './routes';
import log from './logger';
declare type Render = (router: FunctionComponent<{}>) => {
    jsx: ReactElement;
    afterSSR?: (html: string) => string;
    afterHydrate?: () => void;
};
export default function app({ routes, render, notFound, }: {
    routes: Routes;
    render: Render;
    notFound: () => void;
}): (path?: string | undefined) => Promise<{
    jsx: ReactElement<any, string | ((props: any) => ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
    afterSSR?: ((html: string) => string) | undefined;
    afterHydrate?: (() => void) | undefined;
}>;
declare const router: {
    replace: typeof replace;
    push: typeof push;
    go: typeof go;
    back: typeof back;
    forward: typeof forward;
    link: typeof link;
};
export { createRouter, router, useRouter, routes, initialProps, Link, log, RouteParams, };
