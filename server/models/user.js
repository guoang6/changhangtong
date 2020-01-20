const mongoose = require('mongoose')


const ususerSchemaer = new mongoose.Schema({
    username:{type:String},
    password:{type:String}
})





const user = mongoose.model('user', ususerSchemaer)




module.exports ={user}