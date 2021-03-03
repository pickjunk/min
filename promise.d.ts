export declare const STOP_VALUE: unique symbol;
export declare const STOPPER_PROMISE: Promise<typeof STOP_VALUE>;
declare class StoppablePromise<T> extends Promise<T> {
    static stop(): typeof STOPPER_PROMISE;
}
export default StoppablePromise;
