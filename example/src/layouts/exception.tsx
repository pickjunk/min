import React from 'react';
import './exception.less';

export default function Exception({ children }: { children: React.ReactNode }) {
  return <div id="exception">{children}</div>;
}
