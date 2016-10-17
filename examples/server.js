const express = require('express')
const path = require('path')

const port = process.env.PORT || 3000
const app = express()

const root = path.join(__dirname, '..', '..', 'public')
app.use('/editor', express.static(root))

const exampleMiddleware = (key) => {
  const router = express.Router() // eslint-disable-line new-cap

  const root = path.join(__dirname, key)
  router.use(express.static(root))

  router.get((req, res, next) => {
    if (req.accepts('html')) {
      res.sendFile(path.join(root, 'index.html'))
    } else {
      next()
    }
  })

  return router
}

app.use('/examples/news-article', exampleMiddleware('news-article'))
app.use('/examples/single-page-site', exampleMiddleware('single-page-site'))
app.use('/', exampleMiddleware('news-article'))

app.listen(port, () => {
  console.log(`Listening on port ${port}. Open up http://localhost:${port}/ in your browser`) // eslint-disable-line no-console
})
