const express = require('express')
const router = express.Router()
const service = require('./service')//相关操作逻辑

router.post('/admin/contentexamine', service.contentexamine)
router.post('/admin/getuserlist', service.getuserlist)
router.post('/admin/changeuserstate', service.changeuserstate)

//分类管理
router.post('/admin/lablelist', service.lablelist)
router.post('/admin/changelable', service.changelable)
router.post('/admin/changecarousel', service.changecarousel)
router.post('/admin/carousellist', service.carousellist)
router.post('/admin/deletecarouse', service.deletecarouse)



//公告列表

router.post('/admin/announcementlist', service.announcementlist)

//发布公告
router.post('/admin/setannouncement', service.setannouncement)


//仪表盘数据
router.post('/admin/numbering', service.numbering)







module.exports = router
