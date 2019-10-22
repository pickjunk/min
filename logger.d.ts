export interface Fields {
    [key: string]: any;
}
declare const _default: {
    trace(msg: string | Error | Fields): void;
    debug(msg: string | Error | Fields): void;
    info(msg: string | Error | Fields): void;
    warn(msg: string | Error | Fields): void;
    error(msg: string | Error | Fields): void;
    fatal(msg: string | Error | Fields): void;
};
export default _default;
