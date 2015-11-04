"use strict";

var webpack = require("webpack");
var path = require("path");

module.exports = {
  cache: true,
  entry: path.join(__dirname, "src/index.js"),
	output: {
		path: path.join(__dirname, "lib"),
		filename: "bundle.js",
		libraryTarget: "commonjs"
	},
  resolve: {
    extensions: ["", ".js", "jsx"]
  },
  externals: [
    "vendor-prefix"
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: "babel-loader?stage=0"
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === "production")`
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};
