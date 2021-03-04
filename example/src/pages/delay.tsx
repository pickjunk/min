import React from 'react';
import { RouteLocation, routing } from '@pickjunk/min';
import { breadcrumb$ } from '../hooks/breadcrumb';
import { Table } from 'antd';

export default routing(function ({ path, args, name }) {
  breadcrumb$.next([
    {
      title: '首页',
      name: 'dashboard',
    },
    {
      title: '延迟加载演示',
    },
  ]);
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ path, args, name });
    }, 2000);
  });
})(function Delay({ path, args, name }: RouteLocation) {
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
      dataSource={data}
    />
  );
});
