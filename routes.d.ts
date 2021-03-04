import { ComponentType } from 'react';
export declare type Routing = (match: {
    path: string;
    args?: Params;
    name?: string;
}) => Promise<object | false>;
export declare type Component<T> = ComponentType<T> & {
    routing?: Routing;
    _props?: object;
};
export declare type ImportComponent = () => Promise<Component<any>>;
export declare type Route = {
    name?: string;
    path?: string;
    directory?: string;
    component?: string;
    ssr?: boolean;
    _path?: string;
    _params?: string[];
    importComponent?: ImportComponent;
    children?: Route[];
};
declare type Names = {
    [key: string]: {
        pathTemplate: string;
        paramsRegex: {
            [key: string]: string;
        };
        paramsOptional: {
            [key: string]: boolean;
        };
    };
};
export declare type Params = {
    [key: string]: string;
};
export interface LoadedRoute extends Location {
    route: {
        path: string;
        component: Component<any>;
    }[];
}
export interface Location {
    name?: string;
    path?: string;
    args?: Params;
}
export interface Routes {
    data: Route;
    match(target: string): Promise<LoadedRoute | false>;
    check(target: string): boolean;
    link(location: Location): string;
}
export default function routes(data: Route, names: Names): Routes;
export declare function createRoutes(data: Route): Routes;
export {};
