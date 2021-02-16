export default [
  {
    path: '/a',
    component: '../components/A',
    ssr: true,
  },
  {
    path: '/b',
    component: '../components/B',
    ssr: true,
    children: [
      {
        component: '../components/C',
        ssr: true,
      },
      {
        path: '/a',
        component: '../components/A',
        ssr: true,
      },
    ],
  },
];
