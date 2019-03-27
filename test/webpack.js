import compiler from './compiler';
import path from 'path';

const routesLoader = path.resolve(__dirname, `../lib/loader`);

function compiler(fixture) {
  const compiler = webpack({
    mode: 'none',
    entry: `${routesLoader}!${path.resolve(
      __dirname,
      `./fixtures/routes/${fixture}`,
    )}`,
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        [name]: path.resolve(__dirname, '../lib'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(stats.toJson());
    });
  });
}

(async function main() {
  const stats = await compiler('routes.js');
  console.log(stats.toString({
    color: true,
  }));
})().then(() => {
  //process.exit(0);
}, (e) => {
  console.error(e);
  process.exit(0);
})
