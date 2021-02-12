const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const path = require('path');
module.exports = withBundleAnalyzer({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // fix problem that @react-page/react-admin resolves react-admin from peer dependencies
    config.resolve.alias['react-admin'] = path.resolve(
      __dirname,
      'node_modules/react-admin'
    );
    config.resolve.alias['@material-ui'] = path.resolve(
      __dirname,
      'node_modules/@material-ui'
    );
    // and for uniforms
    config.resolve.alias['uniforms'] = path.resolve(
      __dirname,
      '../packages/editor/node_modules/uniforms'
    );

    // Important: return the modified config
    return config;
  },

  basePath: process.env.RELEASE_CHANNEL
    ? process.env.RELEASE_CHANNEL === 'latest'
      ? '/'
      : '/' + process.env.RELEASE_CHANNEL
    : undefined,
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
    ];
  },
});
