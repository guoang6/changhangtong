const express = require('express')
const router = express.Router()
const service = require('./service')//相关操作逻辑

router.post('/admin/contentexamine', service.contentexamine)
router.post('/admin/getuserlist', service.getuserlist)
router.post('/admin/changeuserstate', service.changeuserstate)

//分类管理
router.post('/admin/lablelist', service.lablelist)
router.post('/admin/changelable', service.changelable)







module.exports = router
