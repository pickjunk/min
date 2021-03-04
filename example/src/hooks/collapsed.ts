import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

const collapsed$ = new BehaviorSubject<boolean>(false);

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
