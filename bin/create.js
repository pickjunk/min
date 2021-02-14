module.exports = function (program) {
  const path = require('path');
  const fs = require('fs-extra');
  const log = require('./log');
  const { version } = require('../package');

  program.command('create <name>').action(function (name) {
    fs.copySync(path.resolve(__dirname, '../example'), path.resolve(name));

    let packageJSON = fs.readFileSync(
      path.resolve(name, './package.json'),
      'utf8',
    );
    packageJSON = packageJSON.replace(`project-name`, name);
    packageJSON = packageJSON.replace(`min-version`, version);
    fs.writeFileSync(path.resolve(name, './package.json'), packageJSON);

    log.info(`create project: ${name}`);
  });
};
