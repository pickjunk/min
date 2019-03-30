const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { name } = require('../package');

let babelrc = fs.readFileSync(path.resolve(__dirname, '../.babelrc'), 'utf-8');
babelrc = JSON.parse(babelrc);

module.exports = {
  entry: './app.js',
  output: {
    filename: 'index.js',
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
        test: /[\\/]routes\.js$/,
        exclude: /node_modules|lib/,
        use: path.resolve(__dirname, '../lib/loader'),
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelrc,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './document.ejs',
    }),
  ],
};
