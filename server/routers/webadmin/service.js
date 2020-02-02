const db = require('../../plugins/db.js')
exports.registered = (req,res) => {
    let info = {
        username:req.body.username,
        password:req.body.password
    }
    let sql = 'insert into user set ?'
    db.base(sql,info,(result) =>{
        let data={
            type:'SUCCESS'
        }
        res.send(data)
    })
}
