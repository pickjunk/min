export default {
  component: '../layouts/Basic',
  children: [
    {
      path: '/',
      component: '../pages/Home',
    },
    {
      path: '/one',
      component: '../pages/One',
    },
    {
      path: '/two',
      component: '../pages/Two',
    },
    {
      path: '/container',
      component: '../layouts/Container',
      children: [
        {
          path: '/two',
          component: '../pages/Two',
        },
      ],
    },
  ],
};
