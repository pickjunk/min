import React from 'react';
import { Link, RouteLocation, routing } from '@pickjunk/min';
import { Space, Table } from 'antd';
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
          width: 100,
          render() {
            return (
              <Space size="middle">
                <Link name="child" args={{ parent: 'weapp' }}>
                  子页面
                </Link>
              </Space>
            );
          },
        },
      ]}
      rowKey="name"
      dataSource={data}
    />
  );
});
