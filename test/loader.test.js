import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';
import { name } from '../package';

const routesLoader = path.resolve(__dirname, `../lib/loader`);

function compiler(fixture) {
  const compiler = webpack({
    mode: 'none',
    entry: `${routesLoader}!${path.resolve(
      __dirname,
      `./fixtures/routes/${fixture}`,
    )}`,
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        [name]: path.resolve(__dirname, '../lib'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(stats.toJson());
    });
  });
}

test('components must be string or string[]', async () => {
  let stats = await compiler('number_components.js');
  expect(stats.errors[0]).toMatch(/components must be string or string\[\]/);

  stats = await compiler('object_components.js');
  expect(stats.errors[0]).toMatch(/components must be string or string\[\]/);
});

test('named route is a leaf that can not has children', async () => {
  const stats = await compiler('named_route_children.js');
  expect(stats.errors[0]).toMatch(
    /named route is a leaf that can not has children/,
  );
});

test('throw param name conflict', async () => {
  let stats = await compiler('param_route_conflict.js');
  expect(stats.errors[0]).toMatch(/param name conflict/);

  stats = await compiler('param_route.js');
  expect(stats.errors[0]).toBe(undefined);
});

test('transpile components to require.ensure (code splitting)', async () => {
  let stats = await compiler('code_splitting.js');
  expect(stats.errors[0]).toBe(undefined);

  for (let chunk of stats.chunks) {
    if (!chunk.modules || chunk.modules.length > 3) {
      continue;
    }

    let files = [];
    chunk.modules.forEach(({ name }) => files.push(name));

    switch (files.length) {
      case 1:
        expect(files[0]).toMatch(/fixtures\/components\/A.jsx/);
        break;
      case 2:
        expect(files[0]).toMatch(/fixtures\/components\/B.jsx/);
        expect(files[1]).toMatch(/fixtures\/components\/C.jsx/);
        break;
      case 3:
        expect(files[0]).toMatch(/fixtures\/components\/A.jsx/);
        expect(files[1]).toMatch(/fixtures\/components\/B.jsx/);
        expect(files[2]).toMatch(/fixtures\/components\/C.jsx/);
        break;
    }
  }
});
