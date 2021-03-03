import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';

const collapsed$ = new Subject<boolean>();

function useCollapsed() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(function () {
    const h = collapsed$.subscribe(function (v) {
      setCollapsed(v);
    });
    return function () {
      h.unsubscribe();
    };
  }, []);

  return collapsed;
}

export { useCollapsed, collapsed$ };
