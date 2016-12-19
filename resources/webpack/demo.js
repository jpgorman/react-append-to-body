var path = require("path")
var webpack = require("webpack")

module.exports = {

  entry: {
    homepage: "./demo/index.js",
  },

  output: {
    publicPath: "/",
    filename: "app.js",
  },

  debug: true,
  devtool: "source-map",

  resolve: {
    modulesDirectories: ["node_modules"],
    extensions: ["",".js"],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["latest", "react"]
        }
      },
    ]
  },
}
