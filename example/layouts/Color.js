import React from 'react';
import log from '@pickjunk/min/logger';

export default function Color({ children }) {
  return (
    <div
      style={{
        color: 'blue',
      }}
      onClick={function () {
        log.info({
          event: 'click',
          name: 'colored'
        });
      }}
    >
      {children}
    </div>
  );
}
