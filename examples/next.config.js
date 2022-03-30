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
});
