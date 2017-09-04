let path = require('path');
let express = require('express');
let webpack = require('webpack');
let config = require('./webpack.config.dev');
let devMiddleWare = require('webpack-dev-middleware');
let hotMiddleWare = require('webpack-hot-middleware');
let open = require("open");
let app = express();
let compiler = webpack(config);
let router = require('./routers.js');

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
app.use('/api', router);

app.use(devMiddleWare(compiler, webpackDevOptions));
app.use(hotMiddleWare(compiler));

app.use(express.static('static'));

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let port = 4560;//端口
app.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${port}/`);
  open(`http://localhost:${port}/`, 'chrome');
});