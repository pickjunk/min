import routes from '../../../lib/routes';

export default routes({
  notFound: {
    name: '404'
  },
  data: {
    path: '/',
    component: '../components/A',
    ssr: true,
    children: [
      {
        path: '404',
        name: '404',
        ssr: true,
      },
      {
        component: '../components/B',
        ssr: true,
        children: [
          {
            path: 'default_child_one',
            component: '../components/A',
            ssr: true,
            name: 'default1',
          },
          {
            children: [
              {
                component: '../components/B',
                ssr: true,
                name: 'default',
              },
              {
                path: 'default_child_two',
                component: '../components/C',
                ssr: true,
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
            component: '../components/B',
            ssr: true,
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
  }
});
