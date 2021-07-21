import React, { ReactElement } from 'react';
import { push, link, RouterLocation } from './Router';

interface Props extends RouterLocation {
  children: ReactElement | string;
}

export default function Link({
  name,
  path,
  args,
  context,
  children,
  ...props
}: Props) {
  const location = {
    name,
    path,
    args,
    context,
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
