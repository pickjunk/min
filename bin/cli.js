#!/usr/bin/env node
// comment above is necessary for windows compatibility
// https://stackoverflow.com/questions/25333570/npm-package-json-bin-wont-work-on-windows

const program = require('commander');
const { version } = require('../package');

program
  .version(version, '-v, --version')
  .option(
    '-c, --config [path]',
    'path of webpack.config.js',
    './webpack.config.js',
  );

require('./create')(program);
require('./dev')(program);
require('./build')(program);
require('./server')(program);
require('./analyze')(program);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
