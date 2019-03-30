const program = require('commander');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');
const path = require('path');
const portfinder = require('portfinder');
const fs = require('fs');
const colors = require('colors/safe');
const { version } = require('../package');

program
  .version(version, '-v, --version')
  .option(
    '-c, --config [path]',
    'path of webpack.config.js',
    './webpack.config.js',
  );

function copyFile(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(path.dirname(target), {
      recursive: true
    });

    fs.copyFileSync(path.resolve(__dirname, source), target);
    console.log(colors.green('[min]'), ` ${target} created`);
  } else {
    console.log(colors.cyan('[min]'), ` ${target} already exists`);
  }
}

program.command('init').action(function() {
  const files = [
    ['../build/bootstrap.js', './bootstrap.js'],
    ['../build/document.ejs', './document.ejs'],
    ['../build/routes.js', './config/routes.js'],
  ];

  for (let [s, t] of files) {
    copyFile(s, t);
  }
});

function mergeConfig(envConfig, configPath) {
  const minConfig = require('../build/webpack.config');

  // merge envConfig
  let config = merge(minConfig, envConfig);

  // merge projectConfig
  let projectConfig = {};
  try {
    projectConfig = require(path.resolve(process.cwd(), configPath));
  } catch (_) {}
  if (typeof projectConfig === 'function') {
    config = projectConfig(config);
  } else if (typeof projectConfig === 'object') {
    config = merge(config, projectConfig);
  } else {
    throw new Error('invalid webpack.config.js, forgot to export your config?');
  }

  return config;
}

program
  .command('dev')
  .option('-p, --port [port]', 'specify server port, defaults to 8000', 8000)
  .action(async function({ config, port }) {
    const WebpackDevServer = require('webpack-dev-server');

    port = await portfinder.getPortPromise({
      port,
    });

    const cfg = mergeConfig(
      {
        mode: 'development',
        plugins: [new WebpackBar()],
        devServer: {
          historyApiFallback: true,
          hot: true,
          open: true,
        },
      },
      config,
    );

    const server = new WebpackDevServer(webpack(cfg), cfg.devServer);
    server.listen(port, '127.0.0.1', () => {
      console.log(`Starting server on http://localhost:${port}`);
    });
  });

program
  .command('build')
  .option(
    '-i, --interactive',
    'interactive environment, should be false in CI or testing',
    true,
  )
  .action(function({ config, interactive }) {
    const plugins = [];
    if (!interactive) {
      plugins.push(new WebpackBar());
    }

    const cfg = mergeConfig(
      {
        mode: 'production',
        plugins,
      },
      config,
    );

    webpack(cfg).run((err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(
        stats.toString({
          color: interactive,
        }),
      );
    });
  });

program
  .command('start')
  .option('-p, --port [port]', 'specify server port, defaults to 8000', 8000)
  .action(function({ port }) {
    const server = require('./server');
    server(port);
  });

program
  .command('analyze')
  .option('-p, --port [port]', 'specify server port, defaults to 8888', 8888)
  .action(async function({ config, port }) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

    port = await portfinder.getPortPromise({
      port,
    });

    const cfg = mergeConfig(
      {
        mode: 'production',
        plugins: [
          new WebpackBar({
            profile: true,
          }),
          new BundleAnalyzerPlugin({
            analyzerPort: port,
          }),
        ],
      },
      config,
    );

    webpack(cfg).run(function(err, stats) {
      if (err) {
        console.error(err);
        return;
      }

      console.log(
        stats.toString({
          colors: true,
        }),
      );
    });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
