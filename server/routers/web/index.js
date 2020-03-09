
const express = require('express')
const router = express.Router()
const service = require('./service')//相关操作逻辑s
//求助
router.post('/web/webgetwebhelplist', service.webgetwebhelplist)
router.post('/web/gethelpcontent', service.gethelpcontent)
//留言
router.post('/web/setcomment', service.setcomment)
router.post('/web/getcomment', service.getcomment)
router.post('/web/setreply', service.setreply)
router.post('/web/getreply', service.getreply)
//活动
router.post('/web/webgetwebactivitylist', service.webgetwebactivitylist)

router.post('/web/webgetweboldstufflist', service.webgetweboldstufflist)

router.post('/web/getoldstuffcontent', service.getoldstuffcontent)



router.post('/web/getnotice', service.getnotice)
router.post('/web/changenotice', service.changenotice)





















module.exports = router
