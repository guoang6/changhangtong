
    const express = require('express')
    const router = express.Router()
    const service = require('./service')//相关操作逻辑

    //注册
    router.post ('/webadmin/registered', service.registered)
    //登录
    router.post ('/webadmin/login', service.login)
    

    module.exports = router
