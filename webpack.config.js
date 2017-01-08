const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['whatwg-fetch', './src/app.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'build/bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify('/trysilr/paameldinger.json'),
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
  ],
  devtool: 'eval-source-map',
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread'],
        },
      },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        },
      },
    ],
  },
};
