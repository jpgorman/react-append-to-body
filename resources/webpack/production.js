var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: 'production',
  entry: {
    main: "./src/index.js"
  },

  output: {
    path: path.join(__dirname, "/../../dist"),
    publicPath: "/",
    filename: "main.js",
    libraryTarget: "umd"
  },

  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
      umd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
      umd: "react-dom"
    }
  },

  devtool: "cheap-module-source-map",

  resolve: {
    modules: ["node_modules"],
    extensions: [".js"]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      }
    ]
  }
};
