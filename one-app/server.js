/**
 * Created by Administrator on 2017/6/16.
 */

let path = require('path');
let express = require('express');
let webpack = require('webpack');
let config = require('./webpack.config.dev');

let app = express();


let compiler = webpack(config);
let webpackDevOptions = {
    noInfo: true,//启动过程信息隐藏
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
}

app.use(require('webpack-dev-middleware')(compiler, webpackDevOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(4560, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:4560');
});