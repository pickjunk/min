import React from 'react';
import Link from '@pickjunk/min/Link';
// @ts-ignore
import './basic.less';

export default function Basic({ children }: { children: React.ReactElement }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <div style={{ textAlign: 'center' }}>
          <h1>Min Framework</h1>
        </div>
        <div style={{ textAlign: 'center' }}>{children}</div>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/one">/one</Link>
          </li>
          <li>
            <Link to="/two">/two</Link>
          </li>
          <li>
            <Link to="/color/two">/color/two</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}