// *Ejected from react-scripts 0.7.0
var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(resolveApp);

// config after eject: we're in ./config/
module.exports = (example) => ({
  appBuild: resolveApp(`examples/${example}/build`),
  appPublic: resolveApp(`examples/${example}/public`),
  appHtml: resolveApp(`examples/${example}/public/index.html`),
  appIndexJs: resolveApp(`examples/${example}/src/index.js`),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp(`examples/${example}/src`),
  testsSetup: resolveApp(`examples/${example}/src/setupTests.js`),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
  nodePaths: nodePaths
});
