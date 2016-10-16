const express = require('express')
const app = express()
const path = require('path')

app.use('/bundle', express.static(`${__dirname}/../public`))
app.use('/examples/single-page-site', express.static(`${__dirname}/single-page-site`))
app.use('/examples/news-article', express.static(`${__dirname}/news-article`))

app.listen(3001 || process.env.PORT)
