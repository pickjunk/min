const path = require('path');
const fs = require('fs');
const log = require('./log');

module.exports = function(minPath) {
  // load min config
  let minConfig = {};
  const m = path.resolve(process.cwd(), minPath);
  if (fs.existsSync(m)) {
    log.info(`found min config: ${m}`);
    minConfig = require(m);
    if (typeof minConfig !== 'object') {
      throw new Error('invalid min.config.js, forget to export your config?');
    }
  }

  // log config, generate log constants
  let logConfig = minConfig.log;
  global.__LOG__ = false;
  global.__LOG_ENDPOINT__ = null;
  global.__LOG_FILE__ = null;
  if (logConfig !== false) {
    if (typeof logConfig != 'object') {
      logConfig = {};
    }
    global.__LOG__ = true;
    global.__LOG_ENDPOINT__ = logConfig.endpoint || '/__log__';
    global.__LOG_FILE__ = logConfig.file;

    const endpoint = global.__LOG_ENDPOINT__;
    const file = global.__LOG_FILE__;
    log.info(
      `log enabled: endpoint=${endpoint}, ${file ? 'file=' + file : 'console'}`,
    );
  }

  // hack __LOG_STUB__ for server
  require('register-module')({
    name: '__LOG_STUB__',
    path: path.resolve(__dirname, '../lib/log'),
    main: 'server.js',
  });
};
