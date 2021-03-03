// There is a wried behavior with babel-loader when it see `Promise.stop`.
// Without this line, Promise in `Promise.stop` and `Promise.prototype` are
// not the same, the former not compiled, the latter compiled to babel runtime
// polyfill.
// DO NOT REMOVE THIS LINE!
const p = Promise;

// Stoppable Promise
// https://github.com/xieranmaya/blog/issues/5
export const STOP_VALUE = Symbol('PromiseStop');
export const STOPPER_PROMISE = p.resolve(STOP_VALUE);

// In development environment, code will be compiled and reloaded
// multiple times in the same process. This module have a side effect for
// global Promise, which means we must make sure this module only initialized
// once, otherwise an infinite loop will occur in the then function and `Maximum
// call stack size exceeded` will fuck and fill your screen.
// DO NOT REMOVE THIS IF STATEMENT!
if (!(p.prototype as any)._then) {
  const then = p.prototype.then;
  // @ts-ignore
  p.prototype.then = function (onResolved, onRejected) {
    // @ts-ignore
    return then.call(
      this,
      onResolved
        ? function (value) {
            return value === STOP_VALUE ? STOP_VALUE : onResolved(value);
          }
        : undefined,
      onRejected,
    );
  };
}

class StoppablePromise<T> extends Promise<T> {
  static stop(): typeof STOPPER_PROMISE {
    return STOPPER_PROMISE;
  }
}

export default StoppablePromise;
