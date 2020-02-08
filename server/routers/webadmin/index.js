
const express = require('express')
const router = express.Router()
const service = require('./service')//相关操作逻辑
const jwt = require('../../plugins/jwt')//引入jwt
router.use(jwt)//express-jwt中间件
router.use(function (err, req, res, next) {
    if(err){
        console.log(err)
    }
    if (err.name === 'UnauthorizedError') {   
        //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
      res.status(401).send('invalid token...');
    }
  });
//注册
router.post('/webadmin/registered', service.registered)
//登录
router.post('/webadmin/login', service.login)


module.exports = router
