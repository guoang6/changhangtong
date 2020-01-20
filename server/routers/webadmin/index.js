module.exports = app=>{
    const express = require('express')
    const router = express.Router()
    const {user}=require('../../models/user')
    //注册
    router.post ('/registered', async (req,res) => {
        const model= await user.create({
            username:req.body.username,
            password:req.body.password
        })
        res.send(model)
    })
    app.use('/webadmin/api',router)
}