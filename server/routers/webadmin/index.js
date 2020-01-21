module.exports = app=>{
    const express = require('express')
    const router = express.Router()
    const {user}=require('../../models/user')
    //注册


    router.post ('/user', async (req,res) => {
        const model= await user.find()
        res.send(model)
    })
    

    router.post ('/registered', async (req,res) => {
        console.log(req.body)
        const model= await user.create({
            username:req.body.username,
            password:req.body.password
        })
        res.send(model)
    })
    app.use('/webadmin/api',router)
}