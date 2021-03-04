import React from 'react';
import { routing, RouteLocation, Link } from '@pickjunk/min';
import { breadcrumb$ } from '../hooks/breadcrumb';
import { Table, Button } from 'antd';

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
        {
          title: '操作',
          render() {
            return (
              <Link name="child" args={{ parent: 'h5' }}>
                <Button>子页面</Button>
              </Link>
            );
          },
        },
      ]}
      dataSource={data}
    />
  );
});
