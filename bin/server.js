const fs = require('fs');
const Koa = require('koa');
const koaStatic = require('koa-static');

module.export = function(port) {
  const server = new Koa();

  server.use(koaStatic('./dist', { index: false }));

  const index = fs.readFileSync('./dist/index.html');
  server.use(async ctx => {
    ctx.body = index;
  });

  server.listen(port);
};
