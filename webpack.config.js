const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./app/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index_bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: "babel-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /.(png|jpg|woff|woff2|eot|ttf|svg|gif)$/, use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 1024000,
                  },
                },
              ]}
        ]
    },
    resolve: {
        extensions: [".jsx", "..."]
    },
    mode: process.env.NODE_ENV === 'production' 
    ? 'production' 
    : 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: "app/index.html"
        })
    ],
    devServer: {
        historyApiFallback: true
    }
}