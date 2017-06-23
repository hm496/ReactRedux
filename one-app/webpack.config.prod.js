let path = require('path');
let webpack = require('webpack');
let htmlWebpackPlugin = require('html-webpack-plugin');
let fs = require('fs');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let cssnano = require('cssnano');

let a = function () {
    console.log(JSON.stringify(process.env.NODE_ENV));
    return JSON.stringify(process.env.NODE_ENV);
}

module.exports = {
    devtool: "source-map",
    entry: {
        app: ['./src/index'],
        vendors: ['react', 'react-dom', 'react-router', 'prop-types', 'classnames'],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name]/entry.js",
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.ejs$/i,
                loader: 'ejs-loader',
            },
            {
                test: /\.jsx?$/i,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: /node_modules/i,
                use: ['react-hot-loader', 'babel-loader'],
            },
            {
                test: /\.scss$/i,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                }),
                include: [
                    path.resolve(__dirname, 'src'),
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[hash].[ext]',
                }
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __DEV__: false,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: "vendor.js"
        }),//提取公共模块
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'main.ejs'),
            inject: 'body', // Inject all scripts into the body
            filename: 'index.html',
            hash: true,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),//错误不打断程序
        new webpack.HotModuleReplacementPlugin(),//模块热替换
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false,  //remove all comments
            },
            compress: {
                warnings: false,
                unused: true,
                dead_code: true,
            },
        }),
    ],
};

