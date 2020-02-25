
const express = require('express')
const router = express.Router()
const service = require('./service')//相关操作逻辑
const jwt = require('../../plugins/jwt')//引入jwt
router.use(jwt)//express-jwt中间件
router.use(function (err, req, res, next) {
  if (err) {
    console.log(err)
  }
  if (err.name === 'UnauthorizedError') {
    //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    res.send({    
        state:{
          "type": 'ERROE',
          "msg": "操作失败"
      },
        code:401});
  }
});
//上传中间件
const multer = require('multer')//上传npm i multer
const uplod = multer({ dest: __dirname + '/../../uplodes' })//
//图片图片上传
router.post('/uplod', uplod.single('file'), service.uplod)
/**
 * 用户信息
 * 
 * 
 * 
 */
//注册
router.post('/webadmin/registered', service.registered)
//登录
router.post('/webadmin/login', service.login)
//用户信息
router.post('/webadmin/getuser', service.getuser)
router.post('/webadmin/updatauser', service.updatauser)



/**
 * 
 * 
 * 求助
 */
// //创建求助
router.post('/webadmin/createhelp', service.createhelp)
//用户u获取求助列表
router.post('/webadmin/getwebhelplist', service.getwebhelplist)
//求助详情
router.post('/webadmin/gethelpdetails', service.gethelpdetails)
//修改求助
router.post('/webadmin/updateehelp', service.updateehelp)
//删除求助
router.post('/webadmin/deletehelp', service.deletehelp)
//创建活动
router.post('/webadmin/createactivity', service.createactivity)
//用户u获取求助列表
router.post('/webadmin/getwebactivitylist', service.getwebactivitylist)
//活动详情
router.post('/webadmin/getactivitydetails', service.getactivitydetails)
//修改活动
// router.post('/webadmin/updateehelp', service.updateehelp)
//删除活动
router.post('/webadmin/deleteactivity', service.deleteactivity)





















module.exports = router
