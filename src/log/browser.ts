import { Fields } from '../logger';
import qs from 'qs';

export default function log(level: string, fields: Fields) {
  // @ts-ignore
  if (__LOG__) {
    fetch(
      // @ts-ignore
      __LOG_ENDPOINT__ +
        qs.stringify(
          {
            level,
            source: 'browser',
            ...fields,
          },
          { addQueryPrefix: true },
        ),
    );
  }
}
