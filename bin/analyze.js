module.exports = function(program) {
  const webpack = require('webpack');
  const WebpackBar = require('webpackbar');
  const portfinder = require('portfinder');
  const webpackConfig = require('./webpack.config');

  program
    .command('analyze')
    .option(
      '-c, --config [path]',
      'path of webpack.config.js',
      './webpack.config.js',
    )
    .option('-p, --port [port]', 'specify server port', 8888)
    .action(async function({ config, port }) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

      port = await portfinder.getPortPromise({
        port,
      });

      const cfg = webpackConfig(function(c) {
        c.mode = 'production';
        process.env.NODE_ENV = 'production';

        c.plugins.push(
          new WebpackBar(),
          new BundleAnalyzerPlugin({
            analyzerPort: port,
          }),
        );

        return c;
      }, config);

      webpack(cfg[1]).run(function(err, stats) {
        if (err) {
          console.error(err);
          return;
        }

        console.log(
          stats.toString({
            colors: true,
          }),
        );
      });
    });
};
