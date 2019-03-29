import path from 'path';

function fixture(p) {
  return path.resolve(__dirname, `../components/${p}`);
}

export default {
  path: '/(a:a)/:b',
  children: [
    {
      path: '(c?:c)',
      component: fixture('A'),
      children: [
        {
          component: fixture('B'),
          children: [
            {
              component: fixture('C'),
            },
          ],
        },
      ],
    },
  ],
};
