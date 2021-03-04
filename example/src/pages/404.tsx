import React from 'react';
// @ts-ignore
import i404 from '../assets/images/404.svg';

export default function notFound() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={i404} />
    </div>
  );
}
