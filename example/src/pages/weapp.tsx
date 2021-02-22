import React from 'react';
import { useRouter } from '@pickjunk/min/Router';

export default function Weapp() {
  const { name, path, args } = useRouter();
  return (
    <div>
      <h4>h5</h4>
      <h4>
        path:{path} args:{JSON.stringify(args)} name:{name}
      </h4>
    </div>
  );
}
