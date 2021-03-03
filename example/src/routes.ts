import { routes } from '@pickjunk/min';

export default routes({
  component: './layouts/app',
  children: [
    {
      path: '/',
      name: 'gate',
      component: './pages/gate',
    },
    {
      component: './layouts/basic',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: './pages/dashboard',
        },
        {
          path: '/delay',
          name: 'delay',
          component: './pages/delay',
        },
        {
          path: '/h5',
          name: 'h5',
          component: './pages/h5',
        },
        {
          path: '/weapp',
          name: 'weapp',
          component: './pages/weapp',
        },
        {
          path: '/child',
          name: 'child',
          component: './pages/child',
        },
      ],
    },
  ],
});
