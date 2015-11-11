var fs = require('fs');
var htmlWebpackPlugin = require('html-webpack-plugin');
var nib = require('nib');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devServer: {
    contentBase: './build'
  },
  entry: ['./app/App.jsx'],
  module: {
    loaders: [
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
      { test: /\.ls$/, loader: 'livescript' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jsx?$/, exclude: /\/node_modules\//, loader: 'babel' },
      { test: /\/res\/image\//, loader: 'url-loader?limit=10000' },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
    ],
    noParse: /jquery|react.js/
  },
  plugins: [
    new htmlWebpackPlugin({ title: 'beef-now' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({ $: 'jquery', app: 'app', React: 'react' })
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, "build")
  },
  resolve: {
    alias: {
      app: 'app.ls',
      jquery: 'jquery/dist/jquery.min.js',
      react: 'react/dist/react.js',
      'react-dom': 'react-dom/dist/react-dom.js',
      typeset: 'typeset/src/index.js',
    },
    modulesDirectories: [
      'app',
      'node_modules'
    ]
  },
  stylus: { use: [nib()] }
};
// vi:et:nowrap
