export default {
  component: '../layouts/Basic',
  children: [
    {
      path: '/',
      component: '../pages/Home',
    },
    {
      name: 'one',
      path: '/one',
      component: '../pages/One',
    },
    {
      name: 'two',
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
