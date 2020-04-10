'use strict'

const path = require('path')

module.exports = {
  entry: './src/keystore.js',
  output: {
    libraryTarget: 'var',
    library: 'Keystore',
    filename: 'orbit-db-keystore.min.js'
  },
  target: 'web',
  mode: 'production',
  devtool: 'sourcemap',
  node: {
    console: false,
    Buffer: true
  },
  plugins: [
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../node_modules')
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../node_modules')
    ],
    moduleExtensions: ['-loader']
  }
}
