import routes from '../../../lib/routes';

export default routes({
  notFound: {
    name: '404'
  },
  data: {
    path: '/foo(bar?:\\d{1,2})/bar.foo(foo:\\w{2}[abc])/:abc/_tail_',
    name: 'foo'
  }
});