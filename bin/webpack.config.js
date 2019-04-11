const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { name } = require('../package');

const minConfig = {
  entry: path.resolve('./bootstrap.js'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      [name]: path.resolve(__dirname, '../lib'),
    },
  },
  module: {
    rules: [
      {
        test: /[\\/]routes\.js$/,
        exclude: /node_modules|lib/,
        use: path.resolve(__dirname, '../lib/loader'),
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};

function mergeConfig(envConfig, configPath) {
  // merge envConfig
  let config = merge(minConfig, envConfig);

  // merge projectConfig
  let projectConfig = {};
  try {
    projectConfig = require(path.resolve(process.cwd(), configPath));
  } catch (_) {}
  if (typeof projectConfig === 'function') {
    config = projectConfig(config);
  } else if (typeof projectConfig === 'object') {
    config = merge(config, projectConfig);
  } else {
    throw new Error('invalid webpack.config.js, forgot to export your config?');
  }

  return config;
}

module.exports = function(envConfig, configPath) {
  const config = mergeConfig(envConfig, configPath);

  const nodeConfig = {
    ...config,
    target: 'node',
    output: {
      filename: 'ssr.js',
      path: path.resolve('./dist'),
      libraryTarget: 'umd',
    },
    plugins: [
      ...config.plugins,
      // disable code splitting
      // https://medium.com/@glennreyes/how-to-disable-code-splitting-in-webpack-1c0b1754a3c5
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  };

  const browserConfig = {
    ...config,
    output: {
      filename: 'bootstrap.js',
      publicPath: '/__min-static__/',
      path: path.resolve('./dist/__min-static__'),
    },
  };

  // inject __MIN_SCRIPT__
  const __MIN_SCRIPT__ =
    JSON.stringify(browserConfig.output.publicPath + browserConfig.output.filename);
  nodeConfig.plugins.push(
    new webpack.DefinePlugin({
      __MIN_SCRIPT__,
    }),
  );
  browserConfig.plugins.push(
    new webpack.DefinePlugin({
      __MIN_SCRIPT__,
    }),
  );

  return [nodeConfig, browserConfig];
};
