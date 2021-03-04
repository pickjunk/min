import React from 'react';
import { RouteLocation, routing } from '@pickjunk/min';
import { Table } from 'antd';
import { breadcrumb$ } from '../hooks/breadcrumb';

export default routing(async function ({ path, args, name }) {
  breadcrumb$.next([
    {
      title: '首页',
      name: 'dashboard',
    },
    {
      title: '小程序',
    },
  ]);
  return { path, args, name };
})(function Weapp({ name, path, args }: RouteLocation) {
  const columns = [
    {
      title: 'path',
      dataIndex: 'path',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'args',
      dataIndex: 'args',
    },
  ];

  const data = [
    {
      path,
      name,
      args: JSON.stringify(args),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
});
