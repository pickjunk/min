import path from 'path';

function fixture(p) {
  return path.resolve(__dirname, `../components/${p}`);
}

export default {
  path: '/(a:a)/:b',
  children: [
    {
      path: '(c?:c)',
      components: fixture('A'),
      children: [
        {
          components: [fixture('B'), fixture('C')],
          children: [
            {
              components: [fixture('A'), fixture('B'), fixture('C')],
            },
          ],
        },
      ],
    },
  ],
};
