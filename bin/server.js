module.exports = function(program) {
  const path = require('path');
  const log = require('./log');
  const webpackConfig = require('./webpack.config');

  program
    .command('start')
    .option('-p, --port [port]', 'specify server port', 8000)
    .action(function({ config, port }) {
      const express = require('express');
      const server = express();

      const [nodeCfg, browserCfg] = webpackConfig(c => c, config);
      server.use(
        browserCfg.output.publicPath,
        express.static(browserCfg.output.publicPath),
      );

      // https://github.com/webpack/webpack-dev-middleware#server-side-rendering
      server.use(async (req, res) => {
        log.info(`server side render: ${req.originalUrl}`);

        let render = require(path.resolve(
          nodeCfg.output.path,
          nodeCfg.output.filename,
        ));
        render = render.default || render;

        const html = await render(req, res);
        if (html) {
          res.end(html);
        }
      });

      server.listen(port, '127.0.0.1', () => {
        log.info(`Starting server on http://localhost:${port}`);
      });
    });
};
