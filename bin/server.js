module.exports = function(program) {
  const log = require('./log');

  program
    .command('start')
    .option('-p, --port [port]', 'specify server port, defaults to 8000', 8000)
    .action(function({ port }) {
      log.warn('TODO server');
    });
};
