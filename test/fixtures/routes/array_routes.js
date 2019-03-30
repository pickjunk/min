export default [
  {
    path: '/a',
    component: '../components/A',
  },
  {
    path: '/b',
    component: '../components/B',
    children: [
      {
        component: '../components/C',
      },
      {
        path: '/a',
        component: '../components/A',
      },
    ],
  },
];
