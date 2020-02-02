var express = require('express')
var bodyParser = require('body-parser')
var router = require('./routers/webadmin')

const localPort = 3000
var app = express()
// 自定义跨域中间件
var allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  };
  app.use(allowCors);//使用跨域中间件
  
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(jsonParser)
app.use(urlencodedParser)
app.use(router)
app.listen(localPort, () => {
    console.log('启动成功')
})