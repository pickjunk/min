import React, { useEffect } from 'react';
import { router, useRouter } from '@pickjunk/min';
import { Table } from 'antd';
import { breadcrumb$ } from '../hooks/breadcrumb';

export default function Weapp() {
  const { name, path, args } = useRouter();

  useEffect(function () {
    if (!args.parent) {
      router.replace({
        name: '404',
      });
      return;
    }

    breadcrumb$.next([
      {
        title: '首页',
      },
      {
        title: '小程序',
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
