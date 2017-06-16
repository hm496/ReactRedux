let path = require('path');
let fs = require('fs');
let webpack = require('webpack');
let sassLoader = 'style!css!sass?sourceMap=true&sourceMapContents=true';

module.exports = {
    devtool: "cheap-module-eval-source-map",
    entry: {
        app: [
            'webpack-hot-middleware/client',
            './src/app',
        ],
        vendors: ['react', 'react-dom', 'react-router'],
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js",
        publicPath: '/static/',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel'],
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                loaders: sassLoader,
            },
            {
                test: /\.jsx$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                loaders: ['react-hot', 'babel'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loaders: 'url-loader?name=img/[name].[hash].[ext]'
            },
        ],
    },

    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react'),
        },
        extensions: ['', '.js', '.jsx', '.scss', '.css'],
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            chunks: ['vendors']
        }),//提取公共模块
        new webpack.optimize.DedupePlugin(),//删除重复依赖
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __DEV__: true,
        }),
        new webpack.NoErrorsPlugin(),//错误不打断程序
        new webpack.HotModuleReplacementPlugin(),//模块热替换
    ],
};

