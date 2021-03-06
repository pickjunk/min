import path from 'path';
import webpack from 'webpack';
import _ from 'lodash';
import { name } from '../package';

jest.setTimeout(30000);
const routesLoader = path.resolve(__dirname, `../lib/loader`);

function compiler(fixture) {
  const compiler = webpack({
    mode: 'none',
    target: 'node',
    entry: `${routesLoader}!${path.resolve(
      __dirname,
      `./fixtures/routes/${fixture}`,
    )}`,
    output: {
      filename: fixture,
      path: path.resolve(__dirname, 'dist'),
      library: 'routes',
      libraryTarget: 'umd',
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

function func2name(route) {
  if (_.isArray(route)) {
    return route.map(r => func2name(r));
  }
  return {
    path: route.path,
    component: route.component.name,
  };
}

test('routes.match', async () => {
  let stats = await compiler('match.js');
  expect(stats.errors[0]).toBe(undefined);

  const routes = require('./dist/match');
  let r, route, args, name;

  r = await routes.match('/');
  ({ route, location: { args, name } } = r);
  expect(func2name(route)).toEqual([
    {
      path: '/',
      component: 'A',
    },
    {
      path: '__default__',
      component: 'B',
    },
    {
      path: '__default__',
      component: 'B',
    },
  ]);
  expect(args).toEqual({});
  expect(name).toEqual('default');

  r = await routes.match('/default_child_one');
  ({ route, location: { args, name } } = r);
  expect(func2name(route)).toEqual([
    {
      path: '/',
      component: 'A',
    },
    {
      path: '__default__',
      component: 'B',
    },
    {
      path: 'default_child_one',
      component: 'A',
    },
  ]);
  expect(args).toEqual({});
  expect(name).toEqual('default1');

  r = await routes.match('/default_child_two');
  ({ route, location: { args, name } } = r);
  expect(func2name(route)).toEqual([
    {
      path: '/',
      component: 'A',
    },
    {
      path: '__default__',
      component: 'B',
    },
    {
      path: 'default_child_two',
      component: 'C',
    },
  ]);
  expect(args).toEqual({});
  expect(name).toEqual('default2');

  r = await routes.match('/foo');
  ({ route, location: { args, name } } = r);
  expect(func2name(route)).toEqual([
    {
      path: '/',
      component: 'A',
    },
  ]);
  expect(args).toEqual({});
  expect(name).toEqual(undefined);

  r = await routes.match('/foo123abc_bar');
  ({ route, location: { args, name } } = r);
  expect(func2name(route)).toEqual([
    {
      path: '/',
      component: 'A',
    },
    {
      path: 'abc_bar',
      component: 'B',
    },
  ]);
  expect(args).toEqual({ bar: '123', foo: 'abc_' });
  expect(name).toEqual(undefined);

  r = await routes.match('/foo123bar?banana%26=123%3D321');
  ({ route, location: { args, name } } = r);
  expect(func2name(route)).toEqual([
    {
      path: '/',
      component: 'A',
    },
    {
      path: 'bar',
      component: 'B',
    },
  ]);
  expect(args).toEqual({ bar: '123', 'banana&': '123=321' });
  expect(name).toEqual(undefined);

  r = await routes.match('/short_args/foo123abc_bar');
  ({ location: { args } } = r);
  expect(args).toEqual({ foo: 'foo123abc_bar' });

  r = await routes.match('/short_args/foo123/abc_bar');
  ({ location: { args } } = r);
  expect(args).toEqual({ foo: 'foo123', bar: 'abc_bar' });

  r = await routes.match('/short_args/foo123abc_bar/');
  ({ location: { args } } = r);
  expect(args).toEqual({ foo: 'foo123abc_ba', bar: 'r' });

  r = await routes.match('/short_args/foo123/abc_bar/');
  ({ location: { name } } = r);
  expect(name).toEqual('404');

  r = await routes.match('/foobar');
  ({ location: { name } } = r);
  expect(name).toEqual('404');
});

test('routes.check', async () => {
  let stats = await compiler('match.js');
  expect(stats.errors[0]).toBe(undefined);

  const routes = require('./dist/match');
  let r;

  r = routes.check('/');
  expect(r).toEqual(true);

  r = routes.check('/default_child_one');
  expect(r).toEqual(true);

  r = routes.check('/default_child_two');
  expect(r).toEqual(true);

  r = routes.check('/foo');
  expect(r).toEqual(true);

  r = routes.check('/foo123abc_bar');
  expect(r).toEqual(true);

  r = routes.check('/foo123bar?banana%26=123%3D321');
  expect(r).toEqual(true);

  r = routes.check('/short_args/foo123abc_bar');
  expect(r).toEqual(true);

  r = routes.check('/short_args/foo123/abc_bar');
  expect(r).toEqual(true);

  r = routes.check('/short_args/foo123abc_bar/');
  expect(r).toEqual(true);

  r = routes.check('/short_args/foo123/abc_bar/');
  expect(r).toEqual(false);

  r = routes.check('/foobar');
  expect(r).toEqual(false);
});

test('routes.link', async () => {
  let stats = await compiler('link.js');
  expect(stats.errors[0]).toBe(undefined);

  const routes = require('./dist/link');
  let r;

  r = routes.link({
    name: 'foo',
    args: { bar: 0, foo: 'abc', abc: 'abc' }
  });
  expect(r).toEqual('/foo0/bar.fooabc/abc/_tail_');

  r = routes.link({
    name: 'foo',
    args: { foo: 'abc', 'banana&': '123=321', abc: 'gr&=eat' }
  });
  expect(r).toEqual('/foo/bar.fooabc/gr%26%3Deat/_tail_?banana%26=123%3D321');

  r = routes.link({
    path: '/foo',
    args: { foo: 'abc', 'banana&': '123=321', abc: 'gr&=eat' }
  });
  expect(r).toEqual('/foo?foo=abc&banana%26=123%3D321&abc=gr%26%3Deat');

  expect(() => {
    routes.link({
      name: 'foo'
    });
  }).toThrow(/argument.*required/);

  expect(() => {
    routes.link({
      name: 'foo',
      args: { foo: 233 }
    });
  }).toThrow(/argument.*invalid/);
});

test('fix the corner case in matching default children', async () => {
  let stats = await compiler('match.js');
  expect(stats.errors[0]).toBe(undefined);

  const routes = require('./dist/match');
  let r, name;

  r = await routes.match('/no_default_child');
  ({ location: { name } } = r);
  expect(name).toEqual('404');
  r = routes.check('/no_default_child');
  expect(r).toEqual(false);
});

test('routes support array in top layer', async () => {
  let stats = await compiler('array_routes.js');
  expect(stats.errors[0]).toBe(undefined);

  const routes = require('./dist/array_routes');
  let r, route;

  r = await routes.match('/a');
  ({ route } = r);
  expect(func2name(route)).toEqual([
    {
      path: '/a',
      component: 'A',
    },
  ]);

  r = await routes.match('/b');
  ({ route } = r);
  expect(func2name(route)).toEqual([
    {
      path: '/b',
      component: 'B',
    },
    {
      path: '__default__',
      component: 'C',
    },
  ]);

  r = await routes.match('/b/a');
  ({ route } = r);
  expect(func2name(route)).toEqual([
    {
      path: '/b',
      component: 'B',
    },
    {
      path: '/a',
      component: 'A',
    },
  ]);
});

test('routes.ts', async () => {
  let stats = await compiler('typescript.ts');
  expect(stats.errors[0]).toBe(undefined);

  const routes = require('./dist/typescript');
  let r, route, args, name;

  r = await routes.match('/');
  ({ route, location: { args, name } } = r);
  expect(func2name(route)).toEqual([
    {
      path: '/',
      component: 'A',
    },
    {
      path: '__default__',
      component: 'B',
    },
    {
      path: '__default__',
      component: 'B',
    },
  ]);
  expect(args).toEqual({});
  expect(name).toEqual('default');
});

test('fix the corner case in 404', async () => {
  let stats = await compiler('404.js');
  expect(stats.errors[0]).toBe(undefined);

  const routes = require('./dist/404');
  let r;

  r = await routes.check('/');
  expect(r).toEqual(false);
});
