const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "assets/js/[name].js",
  },
  devtool: "inline-source-map",
  target: "web",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    compress: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
              minimize: true,
              colormin: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: true,
              colormin: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv()],
              },
            },
          }, // translates CSS into CommonJS
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              includePaths: [
                path.resolve('../node_modules'),
              ]
            }
          }
        ],
      },
    ],
  },
});
