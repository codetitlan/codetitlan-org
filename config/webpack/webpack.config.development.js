const merge = require('webpack-merge');
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || true)),
};

module.exports = merge(config, {
  devtool: 'source-map',
  entry: {
    jslibs: ['client/libs.js', 'client/polyfills.shim.js', 'webpack-hot-middleware/client'],
    styleLibs: ['client/styles/libs.scss', 'webpack-hot-middleware/client'],
    application: [
      'babel-polyfill',
      'client/index.js',
      'webpack-hot-middleware/client',
    ],
    styles: [
      'client/styles/sugarss.sss',
      'client/styles/cssnext.css',
      'webpack-hot-middleware/client',
    ],
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ],
});
