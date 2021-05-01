const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
        filename: "assets/js/[name].[hash:7].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    "sass-loader", // compiles Sass to CSS
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].[hash:7].bundle.css",
            chunkFilename: "[id].css",
        }),
    ]
})