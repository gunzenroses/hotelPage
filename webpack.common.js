const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Files
const plugins = require("./postcss.config");

module.exports = {
        context: path.resolve(__dirname, ""),
        node: {
            __filename: true,
            __dirname: true,
        },
        entry: {
            UIKit: "./src/pages/UIKit/UIKit.js",
            landing_page: "./src/pages/landingPage/landingPage.js",
            search_room: "./src/pages/searchRoom/searchRoom.js",
            room_details: "./src/pages/roomDetails/roomDetails.js",
            registration: "./src/pages/registration/registration.js",
            signin: "./src/pages/signin/signin.js",
        },
        resolve: {
            extensions: [".scss", ".sass", ".js"],
            alias: {
                Main: path.resolve(__dirname, "src"),
                Images: path.resolve(__dirname, "src/assets/images/"), // Relative path of images
                Fonts: path.resolve(__dirname, "src/assets/fonts/"),   // Relative path of fonts
                Components: path.resolve(__dirname, "src/components/"),
                Pages: path.resolve(__dirname, "src/pages/"),
                Scripts: path.resolve(__dirname, "src/assets/scripts/"),
            },
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
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
                        name: "assets/images/[name].[ext]",
                    },
                },
                {
                    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                    loader: "file-loader",
                    options: {
                        name: "assets/fonts/[name].[ext]",
                    },
                },
            ],
        },
            
        plugins: [
            //new CleanWebpackPlugin(),
            new CopyWebpackPlugin([
                {from: "src/assets/images", to: "assets/images"},
                {from: "src/assets/fonts", to: "assets/fonts"},
            ]),

            /*
                Pages
            */
            
            new HtmlWebpackPlugin({
                filename: "index",
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
        ],
};
