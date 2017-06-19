let path = require('path');
let express = require('express');
let webpack = require('webpack');
let config = require('./webpack.config.dev');
let devMiddleWare = require('webpack-dev-middleware');
let hotMiddleWare = require('webpack-hot-middleware');

let app = express();
let compiler = webpack(config);

let webpackDevOptions = {
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    stats: {
        colors: true,
        chunks: false
    }
};

//路由
app.use(devMiddleWare(compiler, webpackDevOptions));
app.use(hotMiddleWare(compiler));
app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(4560, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:4560');
});