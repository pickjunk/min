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
      path: '/color',
      component: '../layouts/Color',
      children: [
        {
          path: '/two',
          component: '../pages/Two',
        },
      ],
    },
  ],
};
