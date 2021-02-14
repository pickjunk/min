export interface Fields {
    [key: string]: any;
}
declare const _default: {
    trace(msg: Fields | Error | string): void;
    debug(msg: Fields | Error | string): void;
    info(msg: Fields | Error | string): void;
    warn(msg: Fields | Error | string): void;
    error(msg: Fields | Error | string): void;
    fatal(msg: Fields | Error | string): void;
};
export default _default;
