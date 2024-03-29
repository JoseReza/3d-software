const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'development',
  entry: __dirname + "/packages.js",
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    filename: 'packages.js',
    path: __dirname + "/assets"
  },
  plugins: [new NodePolyfillPlugin()]
}