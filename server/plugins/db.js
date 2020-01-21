module.exports = app=>{
    const mongoose= require('mongoose')
    mongoose.set('useCreateIndex', true) 
   mongoose.connect('mongodb://127.0.0.1:27017/changhangtong', {useNewUrlParser:true, useUnifiedTopology: true}, function(err){

    　　if(err){
    
    　　　　console.log('Connection Error:' + err)
    
    　　}else{
    
    　　　　console.log('Connection success!')
    
    　　}
    
    })  
}
