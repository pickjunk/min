import React from 'react';
import { Routes, LoadedRoute, Params, InitialProps, Component } from './routes';
export interface Match extends LoadedRoute {
    location: string;
}
export interface RouterContext extends Match {
    routes: Routes;
    loading: boolean;
}
declare function createRouter(routes: Routes, location: string | undefined, notFound: () => void): Promise<React.FC<{}>>;
export default createRouter;
export declare function push(name: string, args?: Params): void;
export declare function replace(name: string, args?: Params): void;
export declare function go(delta?: number): void;
export declare function back(): void;
export declare function forward(): void;
export declare function link(name: string, args?: Params): string;
export declare function useRouter(): RouterContext | null;
export declare function initialProps(init: InitialProps): (component: Component<any>) => Component<any>;
