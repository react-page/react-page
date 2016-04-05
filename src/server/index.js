const express = require('express')
const path = require('path')

const port = process.env.PORT || 3000
const app = express()

const isProduction = process.env.NODE_ENV === 'production'

const root = path.join(__dirname, '../../public')

app.use(express.static(root))

if (!isProduction) {
  const webpack = require('webpack')
  const webpackConfig = require('webpack.config')

  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}

app.get((req, res, next) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(root, 'index.html'))
  } else {
    next()
  }
})

app.listen(port, () => {
  console.log('Listening on port %d', port) // eslint-disable-line no-console
})
