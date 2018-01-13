module.exports = {
  entry: {
    simple: "./demo/simple.js",
    complex: "./demo/complex.js",
    context: "./demo/context.js"
  },

  output: {
    publicPath: "/",
    filename: "[name].entry.js"
  },

  debug: true,
  devtool: "source-map",

  resolve: {
    modulesDirectories: ["node_modules"],
    extensions: ["", ".js"]
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
      }
    ]
  }
};
