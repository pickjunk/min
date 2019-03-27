const program = require('commander');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');
const path = require('path');
const portfinder = require('portfinder');
const WebpackDevServer = require('webpack-dev-server');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

const { name, version } = require('../package');

function mergeConfig(envConfig, configPath) {
  // merge envConfig
  let config = merge(
    {
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          [name]: path.resolve(__dirname, '../lib'),
        },
      },
      module: {
        rules: [
          {
            test: /\/routes\.js$/,
            exclude: /node_modules/,
            use: [
              path.resolve(__dirname, './loader'),
              'babel-loader'
            ],
          },
          {
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: 'babel-loader',
          },
        ],
      },
    },
    envConfig,
  );

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
  .version(version, '-v, --version')
  .option(
    '-c, --config [path]',
    'path of webpack.config.js',
    './webpack.config.js',
  );

program
  .command('dev')
  .option('-p, --port [port]', 'specify server port, defaults to 8000', 8000)
  .action(async function({ config, port }) {
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
    'interactive environment, should be false in CI or testing, defaults to true',
  )
  .action(function(dir, cmd) {
    console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''));
  });

program
  .command('start')
  .option('-p, --port [port]', 'specify server port, defaults to 8000', 8000)
  .action(function(dir, cmd) {
    console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''));
  });

program
  .command('analyze')
  .option('-p, --port [port]', 'specify server port, defaults to 8888', 8888)
  .action(function({ config, port }) {
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

    webpack(cfg).run(function (err, stats) {
      if (err) {
        console.error(err)
        return
      }

      console.log(stats.toString({
        colors: true,
      }));
    });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
