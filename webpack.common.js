const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require("fs");

const PATHS = {
  src: path.resolve(__dirname, "./src"),
  dist: path.resolve(__dirname, "./dist"),
  pages: "pages/"
}
const PAGES_DIR = `${PATHS.src}/${PATHS.pages}`
const PAGES = fs.readdirSync(PAGES_DIR);
module.exports = {
  context: path.resolve(__dirname, ""),
  node: {
    __filename: true,
    __dirname: true,
  },
  entry: {
    index: "./src/index.js",
    UIKit: "./src/pages/UIKit/UIKit.js",
    "landing-page": "./src/pages/landing-page/landing-page.js",
    "search-room": "./src/pages/search-room/search-room.js",
    "room-details": "./src/pages/room-details/room-details.js",
    registration: "./src/pages/registration/registration.js",
    signin: "./src/pages/signin/signin.js",
  },
  resolve: {
    extensions: [".js", ".scss"],
    alias: {
      Main: path.resolve(__dirname, "src"),
      Fonts: path.resolve(__dirname, "src/assets/fonts/"),
      Images: path.resolve(__dirname, "src/assets/images/"),
      Scripts: path.resolve(__dirname, "src/assets/scripts/"),
      Styles: path.resolve(__dirname, "src/assets/styles/"),
      Components: path.resolve(__dirname, "src/components/"),
      Pages: path.resolve(__dirname, "src/pages/"),
    },
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", { targets: "defaults" }]],
        },
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },
      {
        test: /fonts.*\.svg$/,
        type: "javascript/auto",
        exclude: [path.resolve(__dirname, "./src/components/")],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts/",
              esModule: false,
            },
          },
          {
            loader: "svgo-loader",
          },
        ],
      },
      {
        test: /fonts.*\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/fonts/",
          esModule: false,
        },
      },
      {
        test: /components.*\.(png|jpg|svg|gif)$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/images/",
          esModule: false,
        },
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets/images", to: "assets/images" },
        { from: "src/assets/favicons", to: "assets/favicons" },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: `${PATHS.src}/index.pug`,
      chunks: ["index"],
      inject: "body",
    }),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          filename: `${page}.html`,
          template: `${PAGES_DIR}/${page}/${page}.pug`,
          chunks: [`${page}`],
          inject: "body",
          cache: false,
        })
    ),
  ],
};
