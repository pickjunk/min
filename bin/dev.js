module.exports = function(program) {
  const webpack = require('webpack');
  const WebpackBar = require('webpackbar');
  const path = require('path');
  const portfinder = require('portfinder');
  const log = require('./log');
  const webpackConfig = require('./webpack.config');

  program
    .command('dev')
    .option('-p, --port [port]', 'specify server port, defaults to 8000', 8000)
    .action(async function({ config, port }) {
      const cfg = webpackConfig(
        {
          mode: 'development',
          plugins: [new WebpackBar()],
        },
        config,
      );
      const compiler = webpack(cfg);

      // https://github.com/webpack/webpack-dev-middleware#server-side-rendering
      const middleware = require('webpack-dev-middleware');
      const express = require('express');
      const server = express();

      const [nodeCfg, browserCfg] = cfg;
      server.use(
        middleware(compiler, {
          publicPath: browserCfg.output.publicPath,
          serverSideRender: true,
        }),
      );
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

        let html = await render(req, res);
        if (html) {
          const script =
            browserCfg.output.publicPath + browserCfg.output.filename;

          html = html.replace(
            '<script>__MIN_SCRIPT__</script>',
            `<script src="${script}"></script>`,
          );
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
