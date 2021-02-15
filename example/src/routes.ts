import { routes } from '@pickjunk/min';

export default routes({
  component: './layouts/basic',
  children: [
    {
      path: '/',
      component: './pages/home',
    },
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
      path: '/color',
      component: './layouts/color',
      children: [
        {
          path: '/two',
          component: './pages/two',
        },
      ],
    },
  ],
});
