module.exports = function(program) {
  const webpack = require('webpack');
  const WebpackBar = require('webpackbar');
  const portfinder = require('portfinder');
  const webpackConfig = require('./webpack.config');

  program
    .command('analyze')
    .option('-p, --port [port]', 'specify server port, defaults to 8888', 8888)
    .action(async function({ config, port }) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

      port = await portfinder.getPortPromise({
        port,
      });

      const cfg = webpackConfig(
        {
          mode: 'production',
          plugins: [
            new WebpackBar({
              profile: true,
            }),
            new BundleAnalyzerPlugin({
              analyzerPort: port,
            }),
          ],
        },
        config,
      );

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
