import React from 'react';
import { Card } from 'antd';
import './content.less';

export default function Content({ children }: { children: React.ReactNode }) {
  return <Card id="content">{children}</Card>;
}
