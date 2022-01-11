'use strict'
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      },

      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          'vue-style-loader',
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // you can also read from a file, e.g. `variables.scss`
              // use `data` here if sass-loader version < 8
              /* eslint quotes: ["error", "single", { "allowTemplateLiterals": true }] */
              additionalData: '@import "./scss/_variables";'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/static/img', to: 'static/img' },
        { from: 'public', to: '' }
      ],
      options: {
        concurrency: 100
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
      '~': path.resolve('')
    }
  }

}
