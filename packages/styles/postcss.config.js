const colors = require('material-ui/styles/colors')

module.exports = {
  plugins: [
    require('postcss-cssnext')({
      features: {
        customProperties: {
          variables: colors
        }
      }
    }),
  ]
}
