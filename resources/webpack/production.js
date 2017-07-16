var path = require("path")
var webpack = require("webpack")

module.exports = {
  entry: {
    main: "./src/index.js",
  },

  output: {
    path: path.join(__dirname, "/../../dist"),
    publicPath: "/",
    filename: "index.js",
    libraryTarget: "umd",
  },

  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
      umd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
      umd: "react-dom",
    },
  },

  debug: true,
  devtool: "cheap-module-source-map",

  resolve: {
    modulesDirectories: ["node_modules"],
    extensions: ["",".js"],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["latest", "react"]
        }
      },
    ]
  },
}
