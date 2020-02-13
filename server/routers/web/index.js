
const express = require('express')
const router = express.Router()
const service = require('./service')//相关操作逻辑
//web获取求助列表
router.post('/web/webgetwebhelplist', service.webgetwebhelplist)





















module.exports = router
