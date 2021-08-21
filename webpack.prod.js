const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "https://gunzenroses.github.io/hotelPage/",
    filename: "assets/js/[name].[hash:7].bundle.js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
        cache: true,
      },
      new OptimizeCSSAssetsPlugin(),
    )],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,   // for parallel loading of CSS/JS resources later on
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
          MiniCssExtractPlugin.loader, // creates style nodes from JS strings
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: true,
              colormin: false,
            },
          },
            "postcss-loader", // translates CSS into CommonJS
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              sourceMap: true,
            },
          }
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ImageminPlugin({
      test: /\.(jpe?g|png)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 80,
        }),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[hash:7].bundle.css",
      chunkFilename: "[id].css",
    }),
  ]
})