const express = require('express')
const app = express()
const path = require('path')

app.use('/bundle', express.static(`${__dirname}/../public`))
app.use('/examples/website-components', express.static(`${__dirname}/website-components`))

app.listen(3001 || process.env.PORT)
