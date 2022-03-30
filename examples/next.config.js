const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const path = require('path');
module.exports = withBundleAnalyzer({
  basePath: process.env.RELEASE_CHANNEL
    ? !process.env.RELEASE_CHANNEL || process.env.RELEASE_CHANNEL === 'latest'
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
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  // workaround for react18 and https://github.com/react-dnd/react-dnd/issues/3416
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/jsx-runtime.js': 'react/jsx-runtime',
      'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
    };
    return config;
  },
});
