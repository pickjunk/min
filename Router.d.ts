import React from 'react';
import { Routes, LoadedRoute, Params } from './routes';
export interface Match extends LoadedRoute {
    location: string;
}
export interface RouterContext extends Match {
    routes: Routes;
    loading: boolean;
}
export interface ImperativeRouter {
    (routes: Routes, location: string, notFound: () => void): Promise<React.FC<void>>;
    push(name: string, args?: Params): void;
    replace(name: string, args?: Params): void;
    go(delta?: number): void;
    back(): void;
    forward(): void;
    link(name: string, args?: Params): string;
}
declare const imperativeRouter: ImperativeRouter;
export default imperativeRouter;
export declare function useRouter(): RouterContext | null;
