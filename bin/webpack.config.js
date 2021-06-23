const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const fs = require('fs');
const log = require('./log');
const { name } = require('../package');

module.exports = function (env) {
  const publicPath = __BASE__ + '/__min__/';

  let config = env({
    stats: 'errors-only',
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
          use: [
            {
              loader: `${name}/loader`,
              options: {
                base: __BASE__,
              },
            },
          ],
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            publicPath: publicPath + 'images',
            outputPath: 'images',
          },
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: __LESS_OPTIONS__,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts',
              },
            },
          ],
        },
      ],
    },
    plugins: [],
  });

  // for SSR
  const nodeConfig = merge(
    {
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
    },
    config,
  );

  // for browser
  const browserConfig = merge(
    {
      name: 'browser',
      resolve: {
        alias: {
          __LOG_STUB__: path.resolve(__dirname, '../lib/log/browser'),
        },
      },
      output: {
        filename: 'index.js',
        chunkFilename: 'chunk.[chunkhash:5].js',
        publicPath,
        path: path.resolve('./dist/__min__'),
      },
      plugins: [
        new webpack.DefinePlugin({
          __LOG__,
          __LOG_ENDPOINT__: `"${__LOG_ENDPOINT__}"`,
        }),
      ],
    },
    config,
  );

  return [nodeConfig, browserConfig];
};
