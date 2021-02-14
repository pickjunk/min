let config = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          publicPath: path.join(__MIN_PUBLIC_PATH__, 'images'),
          outputPath: 'images',
        },
      },
    ],
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    proxy: [
      '/api/',
      {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/',
        },
      },
    ],
  },
};

module.exports = config;
