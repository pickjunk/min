// @ts-ignore
import { createRoutes } from '../../../lib/routes';

export default createRoutes({
  path: '/',
  component: '../components/A',
  children: [
    {
      component: '../components/B',
      children: [
        {
          path: 'default_child_one',
          component: '../components/A',
          name: 'default1',
        },
        {
          children: [
            {
              component: '../components/B',
              name: 'default',
            },
            {
              path: 'default_child_two',
              component: '../components/C',
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
          path: '/:foo',
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
});
