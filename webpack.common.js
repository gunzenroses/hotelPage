const path = require("path");
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

//const plugins = require("./postcss.config");

module.exports = {
        context: path.resolve(__dirname, ""),
        node: {
            __filename: true,
            __dirname: true,
        },
        entry: {
            "UIKit": "./src/pages/UIKit/UIKit.js",
            "landing-page": "./src/pages/landing-page/landing-page.js",
            "search-room": "./src/pages/search-room/search-room.js",
            "room-details": "./src/pages/room-details/room-details.js",
            "registration": "./src/pages/registration/registration.js",
            "signin": "./src/pages/signin/signin.js",
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

            ...PAGES.map(page => new HtmlWebpackPlugin({
              filename: `${page}`,
              template: `${PAGES_DIR}/${page}/${page}.pug`,
              chunks: [`${page}`],
              inject: "body",
            }))
        ],
};
