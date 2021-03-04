import React from 'react';
import { RouteLocation, router, routing, stop } from '@pickjunk/min';
import { Table } from 'antd';
import { breadcrumb$ } from '../hooks/breadcrumb';

export default routing(async function ({ path, args, name }) {
  if (!args.parent) {
    router.replace({
      name: '404',
    });
    return stop();
  }

  breadcrumb$.next([
    {
      title: '首页',
      name: 'dashboard',
    },
    args.parent == 'h5'
      ? {
          title: 'H5',
          name: 'h5',
        }
      : {
          title: '小程序',
          name: 'weapp',
        },
    {
      title: '子页面',
    },
  ]);
  return { path, args, name };
})(function Child({ name, path, args }: RouteLocation) {
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
