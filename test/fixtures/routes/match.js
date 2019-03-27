export default {
  path: '/',
  components: '../components/A',
  children: [
    {
      components: ['../components/A', '../components/B'],
      children: [
        {
          path: 'default_child_one',
          components: '../components/A',
          name: 'default1',
        },
        {
          children: [
            {
              components: '../components/B',
              name: 'default',
            },
            {
              path: 'default_child_two',
              components: '../components/B',
              name: 'default2',
            },
          ],
        },
      ],
    },
    {
      path: 'foo',
    },
    {
      path: 'foo(bar:\\d+)',
      children: [
        {
          path: '(foo?:\\w+_)bar',
          components: '../components/B',
        },
        {
          path: 'no_default_child',
          children: [
            {
              children: [
                {
                  path: 'child1',
                },
              ],
            },
            {
              path: 'child2',
            },
          ],
        },
      ],
    },
    {
      path: 'short_args',
      children: [
        {
          path: '/:foo'
        },
        {
          path: '/:foo/:bar',
        },
        {
          path: '/:foo:bar/',
        },
      ],
    },
  ],
};
