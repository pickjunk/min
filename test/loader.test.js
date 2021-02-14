import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';
import { name } from '../package';

jest.setTimeout(30000);
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

test('component must be string', async () => {
  let stats = await compiler('number_component.js');
  expect(stats.errors[0].message).toMatch(/component must be string/);

  stats = await compiler('object_component.js');
  expect(stats.errors[0].message).toMatch(/component must be string/);
});

test('named route is a leaf that can not has children', async () => {
  const stats = await compiler('named_route_children.js');
  expect(stats.errors[0].message).toMatch(
    /named route is a leaf that can not has children/,
  );
});

test('throw param name conflict', async () => {
  let stats = await compiler('param_route_conflict.js');
  expect(stats.errors[0].message).toMatch(/param name conflict/);

  stats = await compiler('param_route.js');
  expect(stats.errors[0]).toBe(undefined);
});

test('transpile component to import("component") (code splitting)', async () => {
  let stats = await compiler('code_splitting.js');
  expect(stats.errors[0]).toBe(undefined);

  const matches = [{
    match: 'fixtures\/components\/A.jsx',
    status: false,
  }, {
    match: 'fixtures\/components\/B.jsx',
    status: false,
  }, {
    match: 'fixtures\/components\/C.jsx',
    status: false,
  }];

  for (let chunk of stats.chunks) {
    if (!chunk.modules || chunk.modules.length > 3) {
      continue;
    }

    let files = chunk.modules.map(({ name }) => name);

    if (files.length === 1) {
      for (let m of matches) {
        const r = new RegExp(m.match)
        if (r.test(files[0])) {
          m.status = true;
        }
      }
    }
  }

  expect(matches).toEqual([{
    match: 'fixtures\/components\/A.jsx',
    status: true,
  }, {
    match: 'fixtures\/components\/B.jsx',
    status: true,
  }, {
    match: 'fixtures\/components\/C.jsx',
    status: true,
  }])
});
