import React, { ReactElement } from 'react';
import { Location } from './routes';
import { push, link } from './Router';

interface Props extends Location {
  children: ReactElement | string;
}

export default function Link({ name, path, args, children, ...props }: Props) {
  const location = {
    name,
    path,
    args,
  };

  return (
    <a
      {...props}
      href={link(location)}
      onClick={function onClick(e: React.MouseEvent) {
        e.preventDefault();
        push(location);
      }}
    >
      {children}
    </a>
  );
}
