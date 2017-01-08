const colors = require('material-ui/styles/colors')

module.exports = {
  plugins: [
    // require('postcss-css-variables')({
    //   variables: colors
    // }),
    require('postcss-cssnext')({
      features: {
        customProperties: {
          variables: colors
        }
      }
    }),
    // require('autoprefixer'),
  ]
}
