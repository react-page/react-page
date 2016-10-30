const colors = require('material-ui/styles/colors')

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-css-variables')({
      variables: colors
    })
  ]
}
