const vendor = require('../../babel.config.js');
module.exports = Object.assign({}, vendor, {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
});
