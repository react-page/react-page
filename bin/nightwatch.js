const childProcess = require('child_process')

const env = Object.assign({}, process.env, { PORT: 4000 })
const server = childProcess.spawn('npm', ['start'], env)

process.on('exit', () => server.kill())

require('nightwatch/bin/runner.js')
