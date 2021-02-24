import React from 'react';
import { Button } from 'antd';
import { router } from '@pickjunk/min';
import './gate.less';

export default function Gate() {
  function login() {
    localStorage.setItem('login', '1');
    router.replace({
      name: 'one',
    });
  }

  return (
    <div id="gate">
      <div className="form">
        <Button type="primary" shape="round" size="large" onClick={login}>
          一键登录
        </Button>
      </div>
    </div>
  );
}
