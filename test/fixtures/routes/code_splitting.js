import path from 'path';
import routes from '../../../lib/routes';

function fixture(p) {
  return path.resolve(__dirname, `../components/${p}`);
}

export default routes({
  notFound: {
    name: '404'
  },
  data: {
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
  }
});
