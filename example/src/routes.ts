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
          path: '/one',
          name: 'one',
          component: './pages/one',
        },
        {
          path: '/two',
          name: 'two',
          component: './pages/two',
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
      ],
    },
  ],
});
