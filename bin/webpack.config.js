const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const fs = require('fs');
const log = require('./log');
const { name } = require('../package');

module.exports = function (env, configPath) {
  let config = env({
    entry: path.resolve('./app.tsx'),
    resolveLoader: {
      alias: {
        [name]: path.resolve(__dirname, '../lib'),
      },
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
          test: /[\\/]routes\.(j|t)s$/,
          exclude: /node_modules|min[\\/]lib/,
          use: `${name}/loader`,
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [],
  });

  // export useful global variable for project webpack.config.js
  global.__MIN_PUBLIC_PATH__ = '/__min-static__/';
  global.__MIN_OUTPUT_PATH__ = path.resolve('./dist/__min-static__');

  // merge project config
  let projectConfig = {};
  const p = path.resolve(process.cwd(), configPath);
  if (fs.existsSync(p)) {
    log.info(`found webpack config: ${p}`);
    projectConfig = require(p);
    if (typeof projectConfig === 'object') {
      config = merge(config, projectConfig);
    } else {
      throw new Error(
        'invalid webpack.config.js, forget to export your config?',
      );
    }
  }

  // for SSR
  const nodeConfig = merge(config, {
    name: 'node',
    target: 'node',
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      __LOG_STUB__: '__LOG_STUB__',
    },
    output: {
      filename: 'ssr.js',
      path: path.resolve('./dist'),
      libraryTarget: 'umd',
    },
    plugins: [
      // disable code splitting
      // https://medium.com/@glennreyes/how-to-disable-code-splitting-in-webpack-1c0b1754a3c5
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  });

  // for browser
  const browserConfig = merge(config, {
    name: 'browser',
    resolve: {
      alias: {
        __LOG_STUB__: path.resolve(__dirname, '../lib/log/browser'),
      },
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[chunkhash:5].js',
      publicPath: __MIN_PUBLIC_PATH__,
      path: __MIN_OUTPUT_PATH__,
    },
    plugins: [
      new webpack.DefinePlugin({
        __LOG__,
        __LOG_ENDPOINT__: `"${__LOG_ENDPOINT__}"`,
      }),
    ],
  });

  return [nodeConfig, browserConfig];
};
