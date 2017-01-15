module.exports = {
  'postcss-cssnext': {
    features: {
      customProperties: {
        variables: require('./colors.js')
      }
    }
  }
}
