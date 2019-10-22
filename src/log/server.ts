import pino from 'pino';
import { Fields } from '../logger';

const isProd = process.env.NODE_ENV === 'production';
// @ts-ignore
const pretty = !isProd && !__LOG_FILE__;
const logger = pino(
  {
    base: null,
    prettyPrint: pretty
      ? {
          translateTime: 'yyyy-mm-dd HH:MM:ss',
        }
      : false,
    level: isProd ? 'info' : 'debug',
  },
  // @ts-ignore
  __LOG_FILE__,
);

export default function log(level: string, fields: Fields) {
  // @ts-ignore
  if (__LOG__) {
    logger[level]({
      type: 'server',
      ...fields,
    });
  }
}
