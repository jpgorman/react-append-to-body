var path = require("path")

module.exports = {
  entry: {
    main: "./src/index.js",
  },

  output: {
    path: path.join(__dirname, "/../../dist"),
    publicPath: "/",
    filename: "[name].js",
    libraryTarget: "umd",
  },

  debug: false,
  devtool: "source-map",

  resolve: {
    modulesDirectories: ["node_modules"],
    extensions: ["",".js"],
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
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
