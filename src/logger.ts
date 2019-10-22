// A logger stub in node or browser will be resolved to different modules
// by webpack.resolve.alias, see bin/webpack.config.js for more details
// @ts-ignore
import log from '__LOG_STUB__';

export interface Fields {
  [key: string]: any;
}

function fields(msg: Fields | Error | string): Fields {
  let result: Fields = {};
  if (typeof msg === 'object') {
    result = {
      ...result,
      ...msg,
    };
  }
  if (msg instanceof Error) {
    result.level = 'error';
    result.msg = msg.message;
  }
  if (typeof msg === 'string') {
    result.msg = msg;
  }
  return result;
}

export default {
  trace(msg: Fields | Error | string) {
    log('trace', fields(msg));
  },
  debug(msg: Fields | Error | string) {
    log('debug', fields(msg));
  },
  info(msg: Fields | Error | string) {
    log('info', fields(msg));
  },
  warn(msg: Fields | Error | string) {
    log('warn', fields(msg));
  },
  error(msg: Fields | Error | string) {
    log('error', fields(msg));
  },
  fatal(msg: Fields | Error | string) {
    log('fatal', fields(msg));
  },
};
