module.exports = {
  path: '/(foo:foo)',
  children: [
    {
      path: '(bar:bar)',
    },
    {
      path: '(bar:bar)',
    },
  ],
};
