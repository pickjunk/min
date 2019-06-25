module.exports = function(program) {
  const webpack = require('webpack');
  const WebpackBar = require('webpackbar');
  const path = require('path');
  const portfinder = require('portfinder');
  const _ = require('lodash');
  const pretty = require('js-object-pretty-print').pretty;
  const log = require('./log');
  const webpackConfig = require('./webpack.config');

  program
    .command('dev')
    .option(
      '-c, --config [path]',
      'path of webpack.config.js',
      './webpack.config.js',
    )
    .option('-v, --verbose', 'show more details', false)
    .option('-p, --port [port]', 'specify server port', 8000)
    .action(async function({ config, port, verbose }) {
      const cfg = webpackConfig(function(c) {
        c.mode = 'development';
        process.env.NODE_ENV = 'development';
        c.devtool = 'cheap-eval-source-map';

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

      const compiler = webpack(cfg);
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

      server.use(async (req, res) => {
        log.info(`server side render: ${req.originalUrl}`);

        const fs = res.locals.fs;
        const filename = path.join(
          nodeCfg.output.path,
          nodeCfg.output.filename,
        );
        const source = fs.readFileSync(filename).toString('utf8');

        const nodeEval = require('node-eval');
        let render = nodeEval(source, filename);
        render = render.default || render;

        const html = await render(req, res);
        if (html) {
          res.end(html);
        }
      });

      port = await portfinder.getPortPromise({
        port,
      });
      server.listen(port, '127.0.0.1', () => {
        log.info(`Starting server on http://localhost:${port}`);
        require('open')(`http://localhost:${port}`);
      });
    });
};
