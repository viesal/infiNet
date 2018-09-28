'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isDevelop = !(env && env.prod);
    return {
        mode: isDevelop ? 'development' : 'production',
        entry: {
            app: ['./src/index.tsx'],
        },
        output: {
            path: path.resolve(__dirname, 'dist')
        },

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ],
                    loader: 'ts-loader'
                },
                {
                    test: /\.js?$/,
                    exclude: [
                        path.resolve(__dirname, 'node_modules')
                    ],
                    loader: 'babel-loader'
                },
                {
                    test: /\.css(\?|$)/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        {loader: 'css-loader'}
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new CopyWebpackPlugin([
                {from: 'static'}
            ]),
            new MiniCssExtractPlugin({
                filename: "[name].css"
            })
        ],
        devServer: {
            port: 3000,
            hot: true,
            inline: true,
            open: true,
            contentBase: path.resolve(__dirname, 'dist')
        }
    };
};