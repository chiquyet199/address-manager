const path = require('path')
module.exports = {
  entry: ['./src/index'],
  module: {
    loaders: [
      { test: /\.js?$/, loader: 'babel-loader!eslint-loader', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },
    ],
  },
  resolve: {
    modules: [path.resolve('./'), path.resolve('./node_modules')],
    extensions: ['.js'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
  },
}
