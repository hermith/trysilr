const webpack = require('webpack');

module.exports = {
  entry: ['whatwg-fetch', './src/app.js'],
  output: {
    path: __dirname,
    filename: 'dist/bundle-min.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify('/api/proxy'),
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
  ],
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
      { test: /\.svg/, loader: 'svg-url-loader' },
    ],
  },
};
