var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
const components = require('../components.json')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

var env = config.lib.env

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    main: './src/index.js',
    
  },
  externals: {
    vue: 'vue'
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd'
  },
  externals: ['vue', 'zrender'],
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.lib.productionSourceMap,
      extract: true
    })
  },
  // stats: 'verbose',
  // profile: true,
  // node: false,
  plugins: [
    new CleanWebpackPlugin(['lib']),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('[name].css')
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ]
})

module.exports = webpackConfig
