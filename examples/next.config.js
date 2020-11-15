module.exports = {
  basePath: process.env.RELEASE_CHANNEL
    ? process.env.RELEASE_CHANNEL === 'latest'
      ? '/'
      : '/' + process.env.RELEASE_CHANNEL
    : undefined,
};
