import React from 'react';
import { Routes, LoadedRoute, Location, Routing, Component } from './routes';
export interface RouterContext extends LoadedRoute {
    routes: Routes;
    loading: boolean;
}
export interface ReachHandler {
    (): Promise<void>;
}
declare function createRouter({ routes, initialRoute, likeApp, }: {
    routes: Routes;
    initialRoute: LoadedRoute;
    likeApp: boolean;
}): Promise<React.FC<{}>>;
export default createRouter;
export declare function push(location: Location): void;
export declare function replace(location: Location): void;
export declare function back(): void;
export declare function forward(): void;
export declare function link(location: Location): string;
export declare function useRouter(): RouterContext | null;
export declare function windowLocation(): string;
export declare function routing(init: Routing): (component: Component<any>) => Component<any>;
