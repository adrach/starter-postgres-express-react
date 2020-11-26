const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPath: resolveApp('.'),
  appPublic: resolveApp('src-client/public'),
  appHtml: resolveApp('src-client/public/index.html'),
  appIndexJs: resolveApp('src-client/index.jsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src-client'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src-client/setupTests'),
  proxySetup: resolveApp('src-client/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  swSrc: resolveModule(resolveApp, 'src-client/service-worker'),
  publicUrlOrPath,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
