'use strict'
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    disableHostCheck: true,
    hot: true,
    watchOptions: {
      poll: true
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

})
