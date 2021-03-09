import routes from '../../../lib/routes';

export default routes({
  notFound: {
    name: '404'
  },
  data: {
    path: '/(foo:foo)',
    children: [
      {
        path: '(bar:bar)',
      },
      {
        path: '(bar:bar)',
      },
    ],
  }
});
