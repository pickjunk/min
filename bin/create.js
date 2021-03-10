module.exports = function (program) {
  const path = require('path');
  const fs = require('fs-extra');
  const log = require('./log');
  const { version } = require('../package');
  const cliProgress = require('cli-progress');
  const axios = require('axios');
  const unzipper = require('unzipper');

  // Thanks to https://futurestud.io/tutorials/axios-download-progress-in-node-js
  async function download(url, dest) {
    log.info('Connecting …');
    const { data, headers } = await axios({
      url,
      timeout: 60 * 1000,
      method: 'GET',
      responseType: 'stream',
    });
    const totalLength = headers['content-length'];

    const bar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic,
    );
    bar.start(totalLength, 0);

    log.info('Starting download');

    const writer = fs.createWriteStream(path.resolve(__dirname, dest));

    return new Promise(function (resolve, reject) {
      data.on('data', (chunk) => bar.increment(chunk.length));
      data.on('error', (err) => {
        bar.stop();
        reject(err);
      });
      writer.on('finish', () => {
        bar.stop();
        resolve();
      });
      data.pipe(writer);
    });
  }

  program.command('create <name>').action(async function (name) {
    const tmpDir = path.resolve(__dirname, '../tmp');
    const zip = path.join(tmpDir, 'template.zip');
    const unzip = path.join(tmpDir, 'min-template-main');

    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }
    await download(
      'https://github.com/pickjunk/min-template/archive/main.zip',
      zip,
    );
    await fs
      .createReadStream(zip)
      .pipe(unzipper.Extract({ path: tmpDir }))
      .promise();

    fs.copySync(unzip, path.resolve(name));

    // let packageJSON = fs.readFileSync(
    //   path.resolve(name, './package.json'),
    //   'utf8',
    // );
    // packageJSON = packageJSON.replace(`project-name`, name);
    // // packageJSON = packageJSON.replace(`min-version`, version);
    // fs.writeFileSync(path.resolve(name, './package.json'), packageJSON);

    log.info(`create project: ${name}`);
  });
};
