import React from 'react';
import { Table } from 'antd';
import { breadcrumb$ } from '../hooks/breadcrumb';
import { RouteLocation, routing } from '@pickjunk/min';

export default routing(async function ({ name, path, args }) {
  breadcrumb$.next([
    {
      title: '首页',
    },
  ]);
  return { name, path, args };
})(function Dashboard({ name, path, args }: RouteLocation) {
  const data = [
    {
      path,
      name,
      args: JSON.stringify(args),
    },
  ];

  return (
    <Table
      columns={[
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
      ]}
      rowKey="name"
      dataSource={data}
    />
  );
});
