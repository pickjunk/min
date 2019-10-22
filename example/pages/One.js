import React from 'react';
import { initialProps } from '@pickjunk/min/Router';

export default initialProps(function({ path, args, name }) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({ path, args, name });
    }, 2000);
  });
})(function One({ path, args, name }) {
  return (
    <>
      <h4>This is one</h4>
      <h4>
        path:{path} args:{JSON.stringify(args)} name:{name}
      </h4>
    </>
  );
});
