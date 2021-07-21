import React from 'react';
import { Routes, LoadedRoute, Location, Routing, Component } from './routes';
export interface Context {
    [key: string]: any;
}
export interface RouterLocation extends Location {
    context?: Context;
}
export interface RouterLoadedRoute extends LoadedRoute {
    context?: Context;
}
export interface RouterContext extends RouterLoadedRoute {
    routes: Routes;
    loading: boolean;
}
export interface ReachHandler {
    (): Promise<void>;
}
declare function createRouter({ routes, initialRoute, likeApp, }: {
    routes: Routes;
    initialRoute: RouterLoadedRoute;
    likeApp: boolean;
}): Promise<React.FC<{}>>;
export default createRouter;
export declare function push(location: RouterLocation): void;
export declare function replace(location: RouterLocation): void;
export declare function back(): void;
export declare function forward(): void;
export declare function link(location: Location): string;
export declare function useRouter(): RouterContext | null;
export declare function windowLocation(): string;
export declare function routing(init: Routing): (component: Component<any>) => Component<any>;
