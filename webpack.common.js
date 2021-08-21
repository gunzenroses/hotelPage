const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require("fs");

const PATHS = {
  src: path.resolve(__dirname, "./src"),
  dist: path.resolve(__dirname, "./dist"),
  pages: "pages/"
}
const PAGES_DIR = `${PATHS.src}/${PATHS.pages}`
const PAGES = fs.readdirSync(PAGES_DIR);

//const plugins = require("./postcss.config");

module.exports = {
  context: path.resolve(__dirname, ""),
  node: {
    __filename: true,
    __dirname: true,
  },
  entry: {
    "index": "./src/index.js",
    "UIKit": "./src/pages/UIKit/UIKit.js",
    "landing-page": "./src/pages/landing-page/LandingPage.js",
    "search-room": "./src/pages/search-room/SearchRoom.js",
    "room-details": "./src/pages/room-details/RoomDetails.js",
    "registration": "./src/pages/registration/Registration.js",
    "signin": "./src/pages/signin/Signin.js",
  },
  resolve: {
    extensions: [".scss", ".sass", ".js"],
    alias: {
      Main: path.resolve(__dirname, "src"),
      Fonts: path.resolve(__dirname, "src/assets/fonts/"),
      Images: path.resolve(__dirname, "src/assets/images/"),
      Scripts: path.resolve(__dirname, "src/assets/scripts/"),
      Styles: path.resolve(__dirname, "src/assets/styles/"),
      Components: path.resolve(__dirname, "src/components/"),
      Pages: path.resolve(__dirname, "src/pages/"),
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
        cache: true,
      }
    )],
  },
  /*
      Loaders with configurations
  */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: { 
          presets: ["es2015"] 
        },
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 3000,
          name: "assets/images/[name].[ext]",
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/fonts/'
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
    new CopyWebpackPlugin([
      { from: "src/assets/images", to: "assets/images" },
      { from: "src/assets/fonts", to: "assets/fonts" },
      { from: "src/assets/favicons", to: "assets/favicons" },
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: `${PATHS.src}/index.pug`,
      chunks: ["index"],
      inject: "body",
    }),

    /*
        Pages
    */
    ...PAGES.map(page => new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: `${PAGES_DIR}/${page}/${page}.pug`,
      chunks: [`${page}`],
      inject: "body",
      cache: false,
    }))
  ],
};
