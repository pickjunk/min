module.exports = function(program) {
  const path = require('path');
  const log = require('./log');
  const webpackConfig = require('./webpack.config');

  program
    .command('start')
    .option('-p, --port [port]', 'specify server port, defaults to 8000', 8000)
    .action(function({ port }) {
      const [nodeCfg, browserCfg] = webpackConfig();
      const express = require('express');
      const server = express();

      server.use(express.static(browserCfg.output.publicPath));
      server.use(async (req, res) => {
        log.info(`server side render: ${req.path}`);

        let render = require(path.resolve(nodeCfg.output.path, nodeCfg.output.filename));
        render = render.default || render;

        let html = await render(req, res);
        if (html) {
          const script = browserCfg.output.publicPath + browserCfg.output.filename;

          html = html.replace(
            '<script>__MIN_SCRIPT__</script>',
            `<script src="${script}"></script>`,
          );
          res.end(html);
        }
      });

      server.listen(port, '127.0.0.1', () => {
        log.info(`Starting server on http://localhost:${port}`);
        require('open')(`http://localhost:${port}`);
      });
    });
};
