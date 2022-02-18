/* eslint-disable no-unused-vars */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    watch: false,
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'), // Prefer `dart-sass`
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: 'public',
                            name: 'images/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            // publicPath: '../'
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new ESLintPlugin(),
    ],
};
