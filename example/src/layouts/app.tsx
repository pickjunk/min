import './app.less';

import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { router, useRouter } from '@pickjunk/min';

export default function Loading({
  children,
}: {
  children: React.ReactElement;
}) {
  const [loading, setLoading] = useState(true);
  const { name } = useRouter();

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (!login && name != 'gate') {
      router.replace({
        name: 'gate',
      });
    }
    setLoading(false);
  }, []);

  return loading ? (
    <Spin>
      <div style={{ height: '100vh' }}></div>
    </Spin>
  ) : (
    children
  );
}