import { FunctionComponent, ReactElement } from 'react';
import createRouter, { replace, push, go, back, forward, link, useRouter, initialProps } from './Router';
import Link from './Link';
import { Routes } from './routes';
declare type Render = (router: FunctionComponent<void>) => ReactElement;
export default function app({ routes, render, afterRender, notFound, }: {
    routes: Routes;
    render: Render;
    afterRender?: () => void;
    notFound: () => void;
}): (path?: string | undefined) => Promise<ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>>;
declare const router: {
    replace: typeof replace;
    push: typeof push;
    go: typeof go;
    back: typeof back;
    forward: typeof forward;
    link: typeof link;
};
export { createRouter, router, useRouter, initialProps, Link };
