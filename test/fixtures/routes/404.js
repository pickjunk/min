import routes from '../../../lib/routes';

export default routes({
  notFound: {
    name: '404',
  },
  data: {
    path: '/base',
    component: '../components/A',
    ssr: true,
    children: [
      {
        path: '/404',
        name: '404',
        ssr: true,
      },
      {
        path: '/',
        component: '../components/B',
        ssr: true,
      },
    ],
  },
});
