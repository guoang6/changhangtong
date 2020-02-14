const db = require('../../plugins/db.js')

var uuid = require('node-uuid');//npm install node-uuid

const { PED_SALT, EXPIRE_SIN, PEIVATE_KEY } = require('../../plugins/config.js')
var jwt = require('jsonwebtoken');
let data
const s = {
    "type": 'SUCCESS',
    "msg": "操作成功"
}
const e = {
    "type": 'ERROE',
    "msg": "操作失败"
}
//web获取求助列表
exports.webgetwebhelplist = (req, res) => {
    let sql1 = ' select count(*) as count from help '
    let info1 = []
    db.base(sql1, info1, (result) => {
        let count = result[0].count
        let pagesize = req.body.pagesize * 1
        let page = (req.body.page - 1) * pagesize

        let info = [pagesize, page]
        let sql = 'select help_id,help_title,createtime from help  limit ? offset ?'
        db.base(sql, info, (result) => {
            if (result.length == 0) {
                data = {
                    state: e,
                    data: {
                    }
                }   //    数据库里面没找到配对的内容返回参数
            } else {
                data = {
                    state: s,
                    data: result,
                    count: count
                }
            }
            console.log(data)
            // console.log(result)
            res.send(data);
        })
    })



}

// exports.aaa = (req, res) => {
//     let info = [req.body.username, req.body.password]

//     let sql = 'select * from user where username=? and password=?'
//     db.base(sql, info, (result) => {
//         if (result.length == 0) {
//             data = {
//                 state: e,
//                 data: {
//                 }
//             }
//         } else {
//             data = {
//                 state: s,
//                 data: {
//                 }
//             }
//         }
//         console.log(result)
//         res.send(data);
//     })
// }