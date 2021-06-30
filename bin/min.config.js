const path = require('path');
const fs = require('fs');
const log = require('./log');

module.exports = function (minPath) {
  // default
  let config = {
    entry: './app.tsx',
    base: '',
    lessOptions: {},
    devServer: {},
    log: true,
  };

  // load min config
  const m = path.resolve(process.cwd(), minPath);
  if (fs.existsSync(m)) {
    log.info(`found min config: ${m}`);
    config = {
      ...config,
      ...require(m),
    };
    if (typeof config !== 'object') {
      throw new Error('invalid min.config.js, forget to export your config?');
    }
  }

  global.__ENTRY__ = config.entry;
  global.__BASE__ = config.base;
  global.__LESS_OPTIONS__ = config.lessOptions;
  global.__DEV_SERVER__ = config.devServer;

  // log
  global.__LOG__ = true;
  global.__LOG_ENDPOINT__ = config.base + '/__log__';
  global.__LOG_FILE__ = null;
  if (config.log) {
    global.__LOG__ = true;

    // log to file
    if (typeof config.log === 'string') {
      global.__LOG_FILE__ = config.log;
      log.info(`log enabled: ${config.log}`);
    }
    // log to console
    else {
      log.info(`log enabled: console`);
    }
  } else {
    global.__LOG__ = false;
    log.info(`log disabled`);
  }

  // hack __LOG_STUB__ for server
  require('register-module')({
    name: '__LOG_STUB__',
    path: path.resolve(__dirname, '../lib/log'),
    main: 'server.js',
  });
};
