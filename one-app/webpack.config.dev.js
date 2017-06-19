let path = require('path');
let webpack = require('webpack');

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
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: /node_modules/,
                use: ['react-hot-loader', 'babel-loader'],
            },
            {
                test: /\.scss$/,
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
                test: /\.(jpe?g|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            chunks: ['vendors']
        }),//提取公共模块
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __DEV__: true,
        }),
        new webpack.NoEmitOnErrorsPlugin(),//错误不打断程序
        new webpack.HotModuleReplacementPlugin(),//模块热替换
    ],
};

