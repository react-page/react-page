// import autoprefixer from 'autoprefixer'
import path from 'path'
import webpack from 'webpack'

const root = path.join(__dirname, '..')

const config = {
  entry: [path.join(root, 'src')],
  output: {
    path: path.join(root, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  // plugins: [
  //   new webpack.optimize.OccurenceOrderPlugin()
  // ],
  resolve: {
    root
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      // query: {
      //   env: {
      //     development: {
      //       presets: ['react-hmre']
      //     }
      //   },
      //   plugins: [
      //     'transform-inline-environment-variables'
      //   ]
      // }
    // }, {
    //   test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
    //   loader: 'url?limit=10000&minetype=application/font-woff'
    // }, {
    //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    //   loader: 'url?limit=10000&minetype=application/octet-stream'
    // }, {
    //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    //   loader: 'file'
    // }, {
    //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    //   loader: 'url?limit=10000&minetype=image/svg+xml'
    }]
  },
  // postcss: () => ([
  //   autoprefixer
  // ]),
  devServer: {
    proxy: {
      '*': 'http://localhost:4000'
    }
  }
}

export default config
