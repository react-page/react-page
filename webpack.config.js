const path = require('path')
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

module.exports = {
  entry: [
    isDevelopment ? 'webpack-hot-middleware/client' : null,
    path.join(__dirname, 'src', 'client')
  ].filter((s) => s),
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    isProduction ? new webpack.optimize.UglifyJsPlugin() : new webpack.HotModuleReplacementPlugin()
  ].filter((s) => s),
  resolve: {
    modules: [
      __dirname,
      'node_modules'
    ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  }
}
