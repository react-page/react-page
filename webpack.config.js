require('babel-register')

const isProduction = require('src/common/pkg/env').isProduction

const config = isProduction() ? require('cfg/release').default : require('cfg/debug').default

module.exports = config
