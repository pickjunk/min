import routes from '../../../lib/routes';

export default routes({
  notFound: {
    name: '404'
  },
  data: [
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
  ]
});
