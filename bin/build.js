module.exports = function (program) {
  const webpack = require('webpack');
  const WebpackBar = require('webpackbar');
  const minConfig = require('./min.config');
  const webpackConfig = require('./webpack.config');

  program
    .command('build')
    .option(
      '-c, --config [path]',
      'path of webpack.config.js',
      './webpack.config.js',
    )
    .option('-m, --min [path]', 'path of min.config.js', './min.config.js')
    .option(
      '-i, --interactive',
      'interactive environment, should be false in CI or testing',
      false,
    )
    .option('-p, --production', 'production mode, enable minifying', false)
    .action(function ({ config, min, interactive, production }) {
      // must before webpackConfig
      minConfig(min);

      const [nodeCfg, browserCfg] = webpackConfig(function (c) {
        if (production) {
          c.mode = 'production';
          process.env.NODE_ENV = 'production';

          const CompressionPlugin = require('compression-webpack-plugin');
          c.plugins.push(new CompressionPlugin());
        } else {
          c.mode = 'development';
          process.env.NODE_ENV = 'development';
        }

        if (interactive) {
          c.plugins.push(new WebpackBar());
        }

        return c;
      }, config);

      webpack([nodeCfg, browserCfg]).run((err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(
          stats.toString({
            color: interactive,
          }),
        );
      });
    });
};
