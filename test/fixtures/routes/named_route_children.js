import routes from '../../../lib/routes';

export default routes({
  notFound: {
    name: '404'
  },
  data: {
    path: '/',
    component: 'foo',
    ssr: true,
    name: 'foo',
    children: [
      {
        component: 'foo',
        ssr: true,
      },
    ],
  }
});
