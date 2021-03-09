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
  const {
    location: { name },
  } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const login = localStorage.getItem('login');
      if (!login && name != 'gate') {
        router.replace({
          name: 'gate',
        });
      }
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? (
    <div className="loading">
      <Spin size="large" />
    </div>
  ) : (
    children
  );
}
