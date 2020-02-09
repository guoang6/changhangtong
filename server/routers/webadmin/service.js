const db = require('../../plugins/db.js')
const { md5 } = require('../../plugins/md5.js')
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
const ep = {
    "type": 'ERROR_PARAMS_EXIST',
    "msg": "用户名重复"
}
//注册
exports.registered = (req, res) => {
    console.log(req)
    let info = {
        username: req.body.username,
        password: req.body.password
    }
    info.password = md5(`${info.password}${PED_SALT}`)
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
    req.body.password = md5(`${req.body.password}${PED_SALT}`)
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
            let uid = result[0].id
            //通过jwt生成token     npm i -s jsonwebtoken
            let token = jwt.sign(
                { uid },
                PEIVATE_KEY,
                { expiresIn: EXPIRE_SIN }
            )
            data = {
                state: s,
                data: {
                    token: token,
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
//图片上传  
exports.uplod = (req, res) => {
    const file = req.file
    file.url = `http://127.0.0.1:3000/uplodes/${file.filename}`
    res.send(file)

}
//创建求助
exports.createhelp = (req, res) => {
    let info = {
        help_id: '',   //互助id 
        user_id: req.user.uid,//  用户di 
        help_title: req.body.help_title,// 标题   
        help_lable: req.body.help_lable,// 标签
        help_content: req.body.help_content,//内容  
        help_img: req.body.help_img,//图片
        help_favour_num: 0,//点赞数    
        help_read_num: 0,//浏览量
        help_state: 0, //状态  
        help_istop: 0,//是否显示
        help_ispublic: 0,//是否置顶
    }
    console.log(info)
}