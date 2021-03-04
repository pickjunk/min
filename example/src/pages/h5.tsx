import React, { useEffect } from 'react';
import { routing, RouteLocation } from '@pickjunk/min';
import { breadcrumb$ } from '../hooks/breadcrumb';
import { Table } from 'antd';

export default routing(async function ({ path, args, name }) {
  breadcrumb$.next([
    {
      title: '首页',
      name: 'dashboard',
    },
    {
      title: 'H5',
    },
  ]);
  return { path, args, name };
})(function H5({ name, path, args }: RouteLocation) {
  useEffect(function () {}, []);

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
