import React, { useEffect } from 'react';
import { initialProps } from '@pickjunk/min';
import { breadcrumb$ } from '../hooks/breadcrumb';
import { Table } from 'antd';

export default initialProps(function ({ path, args, name }) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ path, args, name });
    }, 2000);
  });
})(function Delay({ path, args, name }) {
  useEffect(function () {
    breadcrumb$.next([
      {
        title: '首页',
        name: 'dashboard',
      },
      {
        title: '延迟加载演示',
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
});
