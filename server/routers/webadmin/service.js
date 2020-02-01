const db = require('../../plugins/db.js')
exports.registered = (req,res) => {
    let info = req.body
    let sql = 'insert into user set ?'
    db.base(sql,info,(result) =>{
        res.send('chenggong')
    })
}
