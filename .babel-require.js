require.extensions['.css'] = function () {
  return
}
require('babel-register')({
  presets: [
    'es2015'
  ]
})
require('babel-polyfill')
