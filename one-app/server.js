const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const devMiddleWare = require('webpack-dev-middleware');
const hotMiddleWare = require('webpack-hot-middleware');
const open = require("open");
const app = express();
const compiler = webpack(config);
const router = require('./routers.js');
const compression = require('compression')
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const isMock = !!process.env.MOCK_SERVER;
if (isMock) {
  console.log('Using mock server...');
}


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
app.use(compression());

app.use(devMiddleWare(compiler, webpackDevOptions));
app.use(hotMiddleWare(compiler));
app.use('/api', router);
app.use(express.static('static'));

/*app.all(/^\/api\/(.*)/, (req, res) => {
  console.log(1);
  if (isMock) {
    proxy.web(req, res, { target: 'http://localhost:3011' });
  } else {
    proxy.web(req, res, { target: 'http://localhost:5000/api/' });
  }
});*/

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