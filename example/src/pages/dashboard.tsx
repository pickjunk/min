import React, { useEffect } from 'react';
import { Table } from 'antd';
import { breadcrumb$ } from '../hooks/breadcrumb';
import { useRouter } from '@pickjunk/min';

export default function Dashboard() {
  const { name, path, args } = useRouter();

  useEffect(function () {
    breadcrumb$.next([
      {
        title: '首页',
      },
    ]);
  }, []);

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
}
