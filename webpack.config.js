const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        htmlPlugin,
        new webpack.HotModuleReplacementPlugin({
            multiStep: true,
        }),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,

        host: 'localhost', // Defaults to `localhost`
        port: 3000, // Defaults to 8080
        proxy: {
            '^/api/*': {
                target: 'http://localhost:8000/api/',
                secure: false,
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
};
