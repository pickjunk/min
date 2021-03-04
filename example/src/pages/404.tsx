import React from 'react';
import { Button, Space, Typography } from 'antd';
import { Link } from '@pickjunk/min';
// @ts-ignore
import i404 from '../assets/images/404.svg';

export default function notFound() {
  return (
    <Space direction="vertical" style={{ alignItems: 'center' }}>
      <img src={i404} />
      <Typography.Title style={{ margin: 0 }}>404</Typography.Title>
      <Button type="primary">
        <Link name="dashboard">返回首页</Link>
      </Button>
    </Space>
  );
}
