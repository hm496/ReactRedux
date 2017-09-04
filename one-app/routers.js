var express = require('express');

var api = express.Router();
// 该路由使用的中间件
api.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
api.post('/', function (req, res) {
  console.log(req);
  res.send("242");
});

var Routers = {
  api,
}

module.exports = Routers;