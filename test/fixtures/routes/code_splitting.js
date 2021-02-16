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
      ssr: true,
      children: [
        {
          component: fixture('B'),
          ssr: true,
          children: [
            {
              component: fixture('C'),
              ssr: true,
            },
          ],
        },
      ],
    },
  ],
};
