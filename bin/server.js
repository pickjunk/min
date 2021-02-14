module.exports = function (program) {
  const path = require('path');
  const log = require('./log');
  const minConfig = require('./min.config');
  const webpackConfig = require('./webpack.config');

  program
    .command('start')
    .option(
      '-c, --config [path]',
      'path of webpack.config.js',
      './webpack.config.js',
    )
    .option('-m, --min [path]', 'path of min.config.js', './min.config.js')
    .option('-p, --port [port]', 'specify server port', 8000)
    .action(function ({ config, min, port }) {
      const express = require('express');
      const server = express();

      // must before webpackConfig
      minConfig(min);

      const [nodeCfg, browserCfg] = webpackConfig(c => c, config);

      server.use(
        browserCfg.output.publicPath,
        express.static(browserCfg.output.path),
      );

      if (__LOG__) {
        const log = require('../lib/logger').default;

        server.get(__LOG_ENDPOINT__, (req, res) => {
          res.setHeader('Surrogate-Control', 'no-store');
          res.setHeader(
            'Cache-Control',
            'no-store, no-cache, must-revalidate, proxy-revalidate',
          );
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');

          try {
            const { level, ...data } = req.query;
            log[level](data);
            res.send('ok');
          } catch (e) {
            log.error(e);
            res.send('fail');
          }
        });
      }

      // https://github.com/webpack/webpack-dev-middleware#server-side-rendering
      const ssr = require('./ssr');
      server.use(async (req, res) => {
        const [render, afterSSR] = require(path.resolve(
          nodeCfg.output.path,
          nodeCfg.output.filename,
        )).default;

        await ssr(
          req,
          res,
          render,
          afterSSR,
          browserCfg.output.publicPath + browserCfg.output.filename,
        );
      });

      server.listen(port, () => {
        log.info(`Starting server on http://0.0.0.0:${port}`);
      });
    });
};
