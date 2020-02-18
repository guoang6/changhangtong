
const express = require('express')
const router = express.Router()
const service = require('./service')//相关操作逻辑
//web获取求助列表
router.post('/web/webgetwebhelplist', service.webgetwebhelplist)
router.post('/web/gethelpcontent', service.gethelpcontent)
router.post('/web/setcomment', service.setcomment)

router.post('/web/getcomment', service.getcomment)


















module.exports = router
