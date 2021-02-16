module.exports = {
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
};
