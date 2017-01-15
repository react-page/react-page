module.exports = {
  plugins: [
    require('postcss-cssnext')({
      features: {
        customProperties: {
          variables: require('./colors')
        }
      }
    })
  ]
}
