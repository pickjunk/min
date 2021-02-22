import { routes } from '@pickjunk/min';

export default routes({
  component: './layouts/app',
  children: [
    {
      path: '/',
      component: './pages/gate',
    },
    {
      component: './layouts/basic',
      children: [
        {
          name: 'one',
          path: '/one',
          component: './pages/one',
        },
        {
          name: 'two',
          path: '/two',
          component: './pages/two',
        },
        {
          name: 'h5',
          path: '/h5',
          component: './pages/h5',
        },
        {
          name: 'weapp',
          path: '/weapp',
          component: './pages/weapp',
        },
      ],
    },
  ],
});
