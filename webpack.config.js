module.exports = {
  entry: ['whatwg-fetch', './src/app.js'],
  output: {
    path: __dirname,
    filename: 'build/bundle.js',
  },
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
      { test: /\.svg/, loader: 'svg-url-loader' },
    ],
  },
};
