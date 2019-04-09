module.exports = function(program) {
  const path = require('path');
  const fs = require('fs-extra');
  const log = require('./log');

  program.command('create <name>').action(function(name) {
    fs.copySync(path.resolve(__dirname, '../example'), path.resolve(name));
    log.info(`create project: ${name}`);
  });
};
