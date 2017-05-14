module.exports = (ctx) => ({
  map: ctx.options.map,
  parser: ctx.options.parser,
  plugins: {
    'postcss-import': { root: ctx.file.dirname },
    'postcss-nested': { },
    'postcss-cssnext': {
      features: {
        customProperties: {
          variables: require('./config/postcss.colors.js')
        }
      }
    }
  }
})
