const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const distPath = path.resolve(__dirname, '../../dist');

const targets = [
  // 'web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron-main'
  'web',
].map(target => (
  webpackMerge(baseConfig, {
    target,
    output: {
      path: path.resolve(`${distPath}/${target}`),
      filename: `[name].${target}.js`,
    },
  })
));

module.exports = targets;
