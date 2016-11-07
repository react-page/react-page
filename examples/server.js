const express = require('express')
const path = require('path')
const compression = require('compression')

const port = process.env.PORT || 3000
const app = express()
const server = require('http').createServer(app)

app.use(compression())
app.use('/editor', express.static(path.join(__dirname, '..', 'public')))

const exampleMiddleware = (key) => {
  const router = express.Router() // eslint-disable-line new-cap

  const example = path.join(__dirname, key)
  router.use(express.static(example))

  router.get((req, res, next) => {
    if (req.accepts('html')) {
      res.sendFile(path.join(example, 'index.html'))
    } else {
      next()
    }
  })

  return router
}

app.use('/news-article', exampleMiddleware('news-article'))
app.use('/single-page-site', exampleMiddleware('single-page-site'))
app.use('/', exampleMiddleware('home'))

server.listen(port, () => {
  console.log(`Listening on port ${port}. Open up http://localhost:${port}/ in your browser`) // eslint-disable-line no-console
})
