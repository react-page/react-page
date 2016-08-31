const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const R = require('ramda')
const webpack = require('webpack')

// isProduction :: Boolean
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

// createEnvAwareArray :: [a] -> [a]
// Should be used together with `ifProduction` and `ifDevelopment`.
//  * If `ifProduction`, then `createEnvAwareArray([ifProduction(plugin)]) = [plugin]`
//  * If `ifDevelopment`, then `createEnvAwareArray([ifProduction(plugin)]) = []`
//  * Regardless of `NODE_ENV`, `createEnvAwareArray([plugin]) = [plugin]`
const createEnvAwareArray = R.reject(R.isNil)
const ifProduction = (x) => isProduction ? x : null
const ifDevelopment = (x) => isDevelopment ? x : null

// Used loaders for css after `style-loader`
const cssLoaders = [
  'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
  'postcss'
]

const cssGlobalLoaders = [
  'css',
  'postcss'
]

module.exports = {
  // entry :: [a]
  // Used entry files
  entry: createEnvAwareArray([
    ifDevelopment('webpack-hot-middleware/client'),
    path.join(__dirname, 'src', 'client')
  ]),
  // output :: { path: String, publicPath :: String, filename :: String}
  // Output bundle
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  // plugins :: [a]
  // Used webpack plugins
  plugins: createEnvAwareArray([
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'client', 'index.ejs'),
      inject: 'body'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    ifDevelopment(new webpack.HotModuleReplacementPlugin()),
    ifProduction(new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })),
    ifProduction(new webpack.optimize.UglifyJsPlugin()),
    ifProduction(new ExtractTextPlugin('styles.css'))
  ]),
  // resolve :: { modules :: [String] }
  // Configure webpack for `NODE_PATH=.`
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
      exclude: /node_modules/,
      query: {
        presets: [
          ['es2015', { modules: false }],
          'stage-2',
          'react'
        ],
        plugins: [
          'transform-inline-environment-variables',
          'transform-class-properties'
        ]
      }
    }, {
      test: /\.scoped\.css$/,
      // Use ExtractTextPlugin only in production for HMR
      loaders: isProduction
        ? ExtractTextPlugin.extract('style', cssLoaders)
        : ['style', ...cssLoaders]
    }, {
      test: /\.css$/,
      exclude: /\.scoped.css$/,
      // Use ExtractTextPlugin only in production for HMR
      loaders: isProduction
        ? ExtractTextPlugin.extract('style', cssGlobalLoaders)
        : ['style', ...cssGlobalLoaders]
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  // postcss :: * -> [a]
  // Used PostCSS plugins
  postcss() {
    return [autoprefixer]
  }
}
