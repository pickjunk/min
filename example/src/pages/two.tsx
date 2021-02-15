import React from 'react';
import { initialProps } from '@pickjunk/min/Router';

export default initialProps(function({ path, args, name }) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({ path, args, name });
    }, 500);
  });
})(function Two({ path, args, name }) {
  return (
    <>
      <h4>This is two</h4>
      <h4>
        path:{path} args:{JSON.stringify(args)} name:{name}
      </h4>
    </>
  );
});
