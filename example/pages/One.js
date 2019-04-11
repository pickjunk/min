import React from 'react';

export default function One({ path, args, name }) {
  return (
    <>
      <h4>This is one</h4>
      <h4>path:{path} args:{JSON.stringify(args)} name:{name}</h4>
    </>
  );
}

One.initialProps = function({ path, args, name }) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({ path, args, name });
    }, 2000);
  });
};
