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
    log.info('Connecting...');
    const { data, headers } = await axios({
      url,
      timeout: 60 * 1000,
      method: 'GET',
      responseType: 'stream',
    });
    const totalLength = headers['content-length'];

    log.info('Downloading...');

    const bar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic,
    );
    bar.start(totalLength, 0);

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

  program
    .command('create <template> <project>')
    .action(async function (template, project) {
      log.info(`create project [${project}] with template [${template}]`);

      const tmpDir = path.resolve(__dirname, '../template');
      const zip = path.join(tmpDir, 'template.zip');

      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }
      await download(
        'https://api.github.com/repos/pickjunk/min-template/zipball/main',
        zip,
      );
      await fs
        .createReadStream(zip)
        .pipe(unzipper.Extract({ path: tmpDir }))
        .promise();

      const entries = fs.readdirSync(tmpDir);
      let unzip = '';
      const r = new RegExp('^pickjunk-min-template-.*$');
      for (let entry of entries) {
        if (r.test(entry)) {
          unzip = path.join(tmpDir, entry, template);
          break;
        }
      }

      fs.copySync(unzip, path.resolve(project));
      fs.rmdirSync(tmpDir, {
        recursive: true,
      });

      let packageJSON = fs.readFileSync(
        path.resolve(project, './package.json'),
        'utf8',
      );
      packageJSON = packageJSON.replace(`min-${template}`, project);
      // packageJSON = packageJSON.replace(`min-version`, version);
      fs.writeFileSync(path.resolve(project, './package.json'), packageJSON);

      log.info(`Done.`);
    });
};
