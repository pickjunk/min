import React from 'react';

export default function Container({ children }) {
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
