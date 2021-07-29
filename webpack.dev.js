const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
        filename: "assets/js/[name].js",
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "./src"),
        inline: true,
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
                    "postcss-loader", // translates CSS into CommonJS
                    "sass-loader", // compiles Sass to CSS
                ],
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.$": "jquery",
            "window.jQuery": "jquery",
        }),
    ]
})
