import React, { ReactElement } from 'react';
import { Params } from './routes';
import router from './Router';

interface Props {
  to: string;
  args?: Params;
  children: ReactElement;
}

export function Link({ to, args, children, ...props }: Props) {
  function onClick() {
    router.push(to, args);
  }

  if (typeof children === 'string') {
    return <a {...props} onClick={onClick}>{children}</a>;
  }

  children.props = {
    ...props,
    ...children.props,
    onClick,
  };

  return children;
}
