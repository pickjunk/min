import React, { ReactElement } from 'react';
import { Params } from './routes';
import router from './Router';

interface Props {
  to: string;
  args?: Params;
  children: ReactElement | string;
}

export default function Link({ to, args, children, ...props }: Props) {
  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    router.push(to, args);
  }

  if (typeof children === 'string') {
    return <a {...props} href={router.link(to, args)} onClick={onClick}>{children}</a>;
  }

  children.props = {
    ...props,
    ...children.props,
    onClick,
  };

  return children;
}
