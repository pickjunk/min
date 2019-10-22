import { ComponentType } from 'react';
export declare type InitialProps = (match: {
    path: string;
    args?: Params;
    name?: string;
}) => Promise<object>;
export declare type Component<T> = ComponentType<T> & {
    initialProps?: InitialProps;
    _props: object;
};
declare type importComponent = () => Promise<Component<any>>;
declare type Route = {
    name?: string;
    path?: string;
    directory?: string;
    component?: string;
    _path?: string;
    _params: string[];
    importComponent?: importComponent;
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
export interface LoadedRoute {
    route: {
        path: string;
        component: Component<any>;
    }[];
    args: Params;
    name?: string;
}
export interface Routes {
    match(target: string): Promise<LoadedRoute | false>;
    check(target: string): boolean;
    link(name: string, args?: Params): string;
}
export default function routes(data: Route, names: Names): Routes;
export {};
