const db = require('../../plugins/db.js')
const {md5} = require('../../plugins/md5.js')
const {PED_SALT} = require('../../plugins/config.js')
let data
const s = {
    "type": 'SUCCESS',
    "msg": "操作成功"
}
const e = {
    "type": 'ERROE',
    "msg": "操作失败"
}
const ep = {
    "type": 'ERROR_PARAMS_EXIST',
    "msg": "用户名重复"
}
//注册
exports.registered = (req, res) => {
    let info = {
        username: req.body.username,
        password: req.body.password
    }
    info.password=md5(`${info.password}${PED_SALT}`)
    let sql = 'insert into user set ?'
    db.base(sql, info, (result, error) => {
        if (error && error.errno == 1062) {
            data = {
                state: ep,
                data: {}
            }
        } else {
            data = {
                state: s,
                data: {}
            }
        }

        res.send(data)
    })
}
//登录
exports.login = (req, res) => {
    let info = [req.body.username, req.body.password]
    let sql = 'select * from user where username=? and password=?'
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
                data: {
                    userinfo: {
                        uid: result[0].id,
                        uname: result[0].username
                    }
                }
            }//返回登录成功
        }
        console.log(result)
        res.send(data);
    })
}
