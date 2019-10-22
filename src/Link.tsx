import React, { ReactElement } from 'react';
import { Params } from './routes';
import { push, link } from './Router';

interface Props {
  to: string;
  args?: Params;
  children: ReactElement | string;
}

export default function Link({ to, args, children, ...props }: Props) {
  function onClick(e: React.MouseEvent) {
    try {
      e.preventDefault();
      push(to, args);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <a {...props} href={link(to, args)} onClick={onClick}>
      {children}
    </a>
  );
}
