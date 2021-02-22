let config = {
  entry: './src/app.tsx',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          publicPath: __MIN_PUBLIC_PATH__ + 'images',
          outputPath: 'images',
        },
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            lessOptions: {
              modifyVars: {
                'primary-color': '#1DA57A',
                'link-color': '#1DA57A',
                'border-radius-base': '2px',
              },
              javascriptEnabled: true,
            },
          },
        }],
      }
    ],
  },
};

if (process.env.NODE_ENV !== 'production') {
  config = {
    ...config,
    devtool: 'eval-cheap-source-map',
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
  }
}

module.exports = config;
