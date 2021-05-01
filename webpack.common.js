// Libraries
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require("webpack-notifier");
const TerserPlugin = require("terser-webpack-plugin");

// Files
const plugins = require("./postcss.config");

// Configuration
//-module.exports = (env, options) => {
//-    return {

module.exports = {
        context: path.resolve(__dirname, "./src"),
        node: {
            __filename: true,
            __dirname: true
        },
        entry: {
            UIKit: "./pages/UIKit/UIKit.js",
            landing_page: "./pages/landingPage/landingPage.js",
            search_room: "./pages/searchRoom/searchRoom.js",
            room_details: "./pages/roomDetails/roomDetails.js",
            registration: "./pages/registration/registration.js",
            signin: "./pages/signin/signin.js",
        },

        // output: {
        //     path: path.resolve(__dirname, "./dist"),
        //     publicPath: "/",
        //     filename: "assets/js/[name].[hash:7].bundle.js",
        // },

        resolve: {
            extensions: [".js"],
            alias: {
                source: path.resolve(__dirname, "./src"), // Relative path of src
                images: path.resolve(__dirname, "./src/assets/images"), // Relative path of images
                fonts: path.resolve(__dirname, "./src/assets/fonts"), // Relative path of fonts
            },
        },

        /*
            Loaders with configurations
        */
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: [
                            {
                                loader: "babel-loader",
                                options: { presets: ["es2015"] },
                            },
                        ],
                },
                {
                    test: /\.pug$/,
                    use: [
                        {
                            loader: "pug-loader",
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 3000,
                        name: "assets/images/[name].[hash:7].[ext]",
                    },
                },
                {
                    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                    loader: "file-loader",
                    options: {
                        name: "assets/fonts/[name].[ext]",
                    },
                },
                {
                    test: /\.(mp4)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: "assets/videos/[name].[hash:7].[ext]",
                    },
                },
            ],
        },
            
        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                }),
            ],
        },

        plugins: [
            new CopyWebpackPlugin([
                {from: "assets/images", to: "assets/images"},
                {from: "assets/fonts", to: "assets/fonts"},
                {
                    from: "assets/images/favicon.ico",
                    to: "assets/images/favicon.ico",
                },
            ]),

            /*
                Pages
            */
            
            new HtmlWebpackPlugin({
                filename: "index.html",
                minify: true,
                template: path.resolve(__dirname, "./src/index.pug"),
                chunks: ["app"],
                inject: "body",
            }),

            //replace one day with utils.pages(env)

            new HtmlWebpackPlugin({
                filename: "UIKit",
                template: path.resolve(__dirname, "./src/pages/UIkit/UIKit.pug"),
                chunks: ["UIKit"],
                inject: "body",
            }),

            new HtmlWebpackPlugin({
                filename: "landing_page",
                minify: true,
                template: path.resolve(__dirname, "./src/pages/landingPage/landingPage.pug"),
                chunks: ["landing_page"],
                inject: "body",
            }),

            new HtmlWebpackPlugin({
                filename: "search_room",
                minify: true,
                template: path.resolve(__dirname, "./src/pages/searchRoom/searchRoom.pug"),
                chunks: ["search_room"],
                inject: "body",
            }),

            new HtmlWebpackPlugin({
                filename: "room_details",
                minify: true,
                template: path.resolve(__dirname, "./src/pages/roomDetails/roomDetails.pug"),
                chunks: ["room_details"],
                inject: "body",
            }),

            new HtmlWebpackPlugin({
                filename: "registration",
                minify: true,
                template: path.resolve(__dirname, "./src/pages/registration/registration.pug"),
                chunks: ["registration"],
                inject: "body",
            }),

            new HtmlWebpackPlugin({
                filename: "signin",
                minify: true,
                template: path.resolve(__dirname, "./src/pages/signin/signin.pug"),
                chunks: ["signin"],
                inject: "body",
            }),

            /* 
                jQuery
            */

            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.$": "jquery",
                "window.jQuery": "jquery",
            }),

            new WebpackNotifierPlugin({
                title: "Your project",
            }),
        ],
    //-};
};
