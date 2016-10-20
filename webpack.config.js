const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const R = require('ramda')
const webpack = require('webpack')

// isProduction :: Boolean
const isProduction = process.env.NODE_ENV === 'production'

// createEnvAwareArray :: [a] -> [a]
// Should be used together with `ifProduction` and `ifDevelopment`.
//  * If `ifProduction`, then `createEnvAwareArray([ifProduction(plugin)]) = [plugin]`
//  * If `ifDevelopment`, then `createEnvAwareArray([ifProduction(plugin)]) = []`
//  * Regardless of `NODE_ENV`, `createEnvAwareArray([plugin]) = [plugin]`
const createEnvAwareArray = R.reject(R.isNil)
const ifProduction = (x) => isProduction ? x : null

// Used loaders for css after `style-loader`
const cssScopedLoaders = [
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
  entry: path.join(__dirname, 'src', 'editor'),
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('styles.css'),
    ifProduction(new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })),
    ifProduction(new webpack.optimize.UglifyJsPlugin()),
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
      loaders: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: cssScopedLoaders })
    }, {
      test: /\.css$/,
      exclude: /\.scoped.css$/,
      loaders: ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: cssGlobalLoaders })
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=image/svg+xml'
    }]
  }
}
