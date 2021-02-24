import React from 'react';
import { Routes, LoadedRoute, Location, InitialProps, Component } from './routes';
export interface Match extends LoadedRoute {
    location: string;
}
export interface RouterContext extends Match {
    routes: Routes;
    loading: boolean;
}
declare function createRouter({ routes, location, notFound, }: {
    routes: Routes;
    location?: string;
    notFound?: () => void;
}): Promise<React.FC<{}>>;
export default createRouter;
export declare function push(location: Location): void;
export declare function replace(location: Location): void;
export declare function go(delta?: number): void;
export declare function back(): void;
export declare function forward(): void;
export declare function link(location: Location): string;
export declare function useRouter(): RouterContext | null;
export declare function initialProps(init: InitialProps): (component: Component<any>) => Component<any>;
