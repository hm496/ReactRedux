var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义POST : /api/submit.json
router.post('/submit.json', function(req, res) {
  let resJson = {
    ok: true
  };
  res.send(JSON.stringify(resJson));
});

module.exports = router;