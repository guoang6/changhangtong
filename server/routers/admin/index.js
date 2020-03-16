const express = require('express')
const router = express.Router()
const service = require('./service')//相关操作逻辑

router.post('/admin/contentexamine', service.contentexamine)
router.post('/admin/getuserlist', service.getuserlist)





module.exports = router
