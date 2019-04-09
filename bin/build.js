module.exports = function(program) {
  const webpack = require('webpack');
  const WebpackBar = require('webpackbar');
  const webpackConfig = require('./webpack.config');

  program
    .command('build')
    .option(
      '-i, --interactive',
      'interactive environment, should be false in CI or testing',
      true,
    )
    .action(function({ config, interactive }) {
      const plugins = [];
      if (!interactive) {
        plugins.push(new WebpackBar());
      }

      const cfg = webpackConfig(
        {
          mode: 'development',
          plugins,
        },
        config,
      );

      webpack(cfg).run((err, stats) => {
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
