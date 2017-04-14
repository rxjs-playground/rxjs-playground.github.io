var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      },{
          loader: 'json-loader',
          test: /\.json$/
        } ]
  },
  node: {
      fs: 'empty',
      module: 'empty',
      net: 'empty'
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new UglifyJSPlugin({
      compress: {
        drop_console : true
      }
    })
  ],
  externals: {
    codemirror: 'CodeMirror'
  }

};
