const path = require('path');
const fs = require('fs');
const log = require('./log');

module.exports = function (minPath) {
  // default
  let minConfig = {
    base: '',
    lessOptions: {},
    devServer: {},
    log: true,
  };

  // load min config
  const m = path.resolve(process.cwd(), minPath);
  if (fs.existsSync(m)) {
    log.info(`found min config: ${m}`);
    minConfig = require(m);
    if (typeof minConfig !== 'object') {
      throw new Error('invalid min.config.js, forget to export your config?');
    }
  }

  global.__BASE__ = minConfig.base;
  global.__LESS_OPTIONS__ = minConfig.lessOptions;
  global.__DEV_SERVER__ = minConfig.devServer;

  // log
  let log = minConfig.log;
  global.__LOG__ = false;
  global.__LOG_ENDPOINT__ = '/__log__';
  global.__LOG_FILE__ = null;
  if (log) {
    global.__LOG__ = true;
    // log to file
    if (typeof log === 'string') {
      global.__LOG_FILE__ = log;
      log.info(
        `log enabled: ${log}`,
      );
    }
    // log to console
    else {
      log.info(
        `log enabled: console`,
      );
    }
  } else {
    log.info(
      `log disabled`,
    );
  }

  // hack __LOG_STUB__ for server
  require('register-module')({
    name: '__LOG_STUB__',
    path: path.resolve(__dirname, '../lib/log'),
    main: 'server.js',
  });
};
