module.exports = function (program) {
  const webpack = require('webpack');
  const WebpackBar = require('webpackbar');
  const path = require('path');
  const portfinder = require('portfinder');
  const _ = require('lodash');
  const pretty = require('js-object-pretty-print').pretty;
  const fs = require('fs');
  const log = require('./log');
  const minConfig = require('./min.config');
  const webpackConfig = require('./webpack.config');
  const nodeEval = require('node-eval');

  program
    .command('dev')
    .option(
      '-c, --config [path]',
      'path of webpack.config.js',
      './webpack.config.js',
    )
    .option('-m, --min [path]', 'path of min.config.js', './min.config.js')
    .option('-v, --verbose', 'show more details', false)
    .option('-p, --port [port]', 'specify server port', 8000)
    .action(async function ({ config, min, port, verbose }) {
      // must before webpackConfig
      minConfig(min);

      const cfg = webpackConfig(function (c) {
        c.mode = 'development';
        process.env.NODE_ENV = 'development';
        //c.devtool = 'cheap-eval-source-map';

        c.resolve.alias = {
          ...c.resolve.alias,
          'react-dom': '@hot-loader/react-dom',
        };
        c.module.rules[1].use = [
          'react-hot-loader/webpack',
          ...c.module.rules[1].use,
        ];

        c.plugins.push(new webpack.HotModuleReplacementPlugin());
        c.plugins.push(new WebpackBar());

        return c;
      }, config);

      const [nodeCfg, browserCfg] = cfg;
      nodeCfg.entry = [
        'webpack-hot-middleware/client?reload=true&name=node',
        nodeCfg.entry,
      ];
      browserCfg.entry = [
        'webpack-hot-middleware/client?reload=true&name=browser',
        browserCfg.entry,
      ];

      if (verbose) {
        log.info('webpack config:', pretty(cfg));
      }

      const compiler = webpack([nodeCfg, browserCfg]);
      const express = require('express');
      const server = express();

      // https://github.com/webpack/webpack-dev-middleware#server-side-rendering
      server.use(
        require('webpack-dev-middleware')(compiler, {
          publicPath: browserCfg.output.publicPath,
          serverSideRender: true,
        }),
      );
      server.use(require('webpack-hot-middleware')(compiler));

      if (nodeCfg.devServer && nodeCfg.devServer.proxy) {
        let proxy = nodeCfg.devServer.proxy;
        if (!_.isArray(proxy)) {
          proxy = [proxy];
        }
        server.use(require('http-proxy-middleware')(...proxy));
      }

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
        const fs = res.locals.fs;
        const filename = path.join(
          nodeCfg.output.path,
          nodeCfg.output.filename,
        );
        const source = fs.readFileSync(filename).toString('utf8');

        const [render, afterSSR] = nodeEval(source, filename).default;
        await ssr(
          req,
          res,
          render,
          afterSSR,
          browserCfg.output.publicPath + browserCfg.output.filename,
        );
      });

      port = await portfinder.getPortPromise({
        port,
      });
      server.listen(port, () => {
        log.info(`Starting server on http://0.0.0.0:${port}`);
        require('open')(`http://0.0.0.0:${port}`);
      });
    });
};
