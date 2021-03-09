import { ComponentType } from 'react';
export declare class Redirect {
    location: Location;
    constructor(location: Location);
}
export declare type Routing = (location: {
    path?: string;
    args?: Params;
    name?: string;
}, redirect: (location: Location) => Redirect) => Promise<RouteProps | Redirect | undefined>;
export declare type Component<T> = ComponentType<T> & {
    routing?: Routing;
};
export declare type ImportComponent = () => Promise<Component<any>>;
export declare type RouteNode = {
    name?: string;
    path?: string;
    directory?: string;
    component?: string;
    ssr?: boolean;
    _path?: string;
    _params?: string[];
    importComponent?: ImportComponent;
    children?: RouteNode[];
};
export declare type RouteNames = {
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
export declare type RouteData = {
    data: RouteNode;
    notFound: Location;
    names?: RouteNames;
};
export declare type MatchedRoute = [
    {
        path: string;
        importComponent: ImportComponent;
    }[],
    Params,
    string?
];
export declare type Params = {
    [key: string]: string;
};
export declare type RouteProps = {
    [key: string]: any;
};
export interface LoadedRoute {
    route: {
        path: string;
        component: Component<any>;
        props: RouteProps;
    }[];
    location: Location;
}
export interface Location {
    name?: string;
    path?: string;
    args?: Params;
}
export interface Routes {
    data: RouteData;
    match(target: string): Promise<LoadedRoute>;
    check(target: string): boolean;
    link(location: Location): string;
}
export default function routes({ data, names, notFound }: RouteData): Routes;
