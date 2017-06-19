let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "cheap-module-eval-source-map",
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './src/app.js',
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: '/',
    },
    module: {
        rules: [
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
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, 'css'),
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
                loader: 'url-loader',
                options: {
                    name: 'img/[name].[hash].[ext]'
                }
            },
        ],
    },
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react'),
        },
        extensions: ['.js', '.jsx', '.scss', '.css'],
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     filename: "vendor.bundle.js"
        // }),//提取公共模块
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __DEV__: true,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            inject: 'body', // Inject all scripts into the body
            filename: 'index.html',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),//错误不打断程序
        new webpack.HotModuleReplacementPlugin(),//模块热替换
    ],
};

