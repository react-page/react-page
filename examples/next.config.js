module.exports = {
  basePath:
    process.env.RELEASE_CHANNEL === 'latest'
      ? '/'
      : '/' + process.env.RELEASE_CHANNEL,
};
