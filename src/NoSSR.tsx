import React, { useEffect, useState } from 'react';

const DefaultOnSSR = () => <span></span>;

export default function NoSSR({
  onSSR = DefaultOnSSR,
  children,
}: {
  onSSR: () => React.ReactNode;
  children: React.ReactNode;
}) {
  const [canRender, setCanRender] = useState(false);

  useEffect(function () {
    setCanRender(true);
  }, []);

  if (canRender) {
    return children;
  }

  return onSSR();
}
