
    const express = require('express')
    const router = express.Router()
    const service = require('./service')

    //注册
    router.post ('/registered', service.registered)
    

    module.exports = router
