const createDevServer = require('../../scripts/createDevServer')
const createPaths = require('../../scripts/createPaths')
const createWebpackConfig = require('../../scripts/createWebpackConfig.dev')

const paths = createPaths()
const config = createWebpackConfig(paths)

createDevServer(config, paths)
