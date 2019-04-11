import React from 'react';

export default function Color({ children }) {
  return (
    <div
      style={{
        color: 'blue',
      }}
    >
      {children}
    </div>
  );
}
