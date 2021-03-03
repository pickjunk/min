import { useEffect, useState } from 'react';
import { RouteLocation } from '@pickjunk/min';
import { Subject } from 'rxjs';
import config from '../config';

export interface Breadcrumb extends RouteLocation {
  title: string;
}

const def: Breadcrumb[] = [];
const breadcrumb$ = new Subject<Breadcrumb[]>();

function useBreadcrumb() {
  const [breadcrumb, setBreadcrumb] = useState(def);

  let title = '';
  if (breadcrumb.length) {
    title = breadcrumb[breadcrumb.length - 1].title;
  }

  useEffect(function () {
    const h = breadcrumb$.subscribe(function (v) {
      setBreadcrumb(v);
    });
    return function () {
      h.unsubscribe();
    };
  }, []);

  useEffect(
    function () {
      document.title = `${config.app}${title ? '-' + title : ''}`;
    },
    [title],
  );

  return { breadcrumb, title };
}

export { useBreadcrumb, breadcrumb$ };
