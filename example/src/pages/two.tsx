import React from 'react';
import { initialProps } from '@pickjunk/min/Router';

export default initialProps(function ({ path, args, name }) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ path, args, name });
    }, 500);
  });
})(function Two({ path, args, name }) {
  return (
    <div>
      <h4>第二页</h4>
      <h4>
        path:{path} args:{JSON.stringify(args)} name:{name}
      </h4>
    </div>
  );
});
