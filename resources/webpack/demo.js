
module.exports = {
  mode: 'development',
  devServer: {
    disableHostCheck: true,
  },
  entry: {
    simple: "./demo/simple.js",
    complex: "./demo/complex.js",
    context: "./demo/context.js"
  },

  output: {
    publicPath: "/",
    filename: "[name].entry.js"
  },

  devtool: "source-map",

  resolve: {
    modules: ["node_modules"],
    extensions: [".js"]
  },

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
