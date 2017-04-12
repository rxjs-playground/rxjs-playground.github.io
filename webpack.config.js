var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor : ['rxjs']
  },
  devtool : '#source-map',
  output: {
    path: path.join(__dirname,"dist"),
    filename: '[name].js',
    publicPath : "http://localhost:8080/assets"
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },{
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
  ],
  externals: {
    codemirror: 'CodeMirror'
  }

};
