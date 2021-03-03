import React, { useEffect } from 'react';
import { useRouter } from '@pickjunk/min';
import { breadcrumb$ } from '../hooks/breadcrumb';
import { Table } from 'antd';

export default function H5() {
  const { name, path, args } = useRouter();

  useEffect(function () {
    breadcrumb$.next([
      {
        title: '首页',
        name: 'dashboard',
      },
      {
        title: 'H5',
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
