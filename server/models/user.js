const mongoose = require('mongoose')


const ususerSchemaer = new mongoose.Schema({
    username:{type:String,unique:true},
    password:{type:String}
})





const user = mongoose.model('user', ususerSchemaer)
//清空数据
// user.db.dropCollection('users')


module.exports ={user}