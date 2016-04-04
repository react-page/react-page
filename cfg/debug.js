// import ExtractTextPlugin from 'extract-text-webpack-plugin'
// import webpack from 'webpack'

import config from './base'

// config.module.loaders.push({
//   test: /\.scss$/,
//   loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
// })
// config.module.loaders.push({
//   test: /\.css$/,
//   loader: ExtractTextPlugin.extract('style', ['css', 'postcss'])
// })
// config.plugins.push(new webpack.optimize.UglifyJsPlugin({
//   mangle: {
//     except: ['Google', 'Dropbox', 'process']
//   }
// }))
// config.plugins.push(new ExtractTextPlugin('styles.css'))

export default config
