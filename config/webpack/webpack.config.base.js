const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseRules = require('./rules').base;

const distPath = path.resolve(__dirname, '../../dist');
const baseConfig = {

  output: {
    filename: 'js/[name].[hash].js',
    path: distPath,
    publicPath: '/',
  },

  module: {
    rules: baseRules,
  },

  resolve: {
    modules: ['node_modules'],
    alias: {
      client: path.join(__dirname, '../../src/client'),
      server: path.join(__dirname, '../../src/server'),
    },
    extensions: ['.js', '.jsx', '.json', '.scss', '.sass', '.sss', '.css'],
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new WebpackManifestPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    // new ServiceWorkerWebpackPlugin({
    //   entry: path.join(__dirname, '../../src/client/sw.js'),
    // }),
    // why can't I use arrows ?
    function customPlugin() {
      // must I reference this ?
      this.plugin('done', () => {
        console.log('weehee');
      });
    },
  ],

};

module.exports = baseConfig;
