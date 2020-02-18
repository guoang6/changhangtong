const db = require('../../plugins/db.js')
const { md5 } = require('../../plugins/md5.js')

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
const ep = {
    "type": 'ERROR_PARAMS_EXIST',
    "msg": "用户名重复"
}
//注册
exports.registered = (req, res) => {
    console.log(req)
    let info = {
        user_id: uuid.v1(),   //用户id 
        username: req.body.username,//用户名
        password: req.body.password,//密码
        nickname:'该用户还没没有设置昵称',//昵称
        avatar:'http://127.0.0.1:3000/uplodes/moren',
        realstate:'0'
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

    let sql = 'select nickname,user_id,avatar from user where username=? and password=?'
    db.base(sql, info, (result) => {
        if (result.length == 0) {
            data = {
                state: e,
                data: {
                }
            }   //    数据库里面没找到配对的内容返回参数
        } else {
            console.log(result[0].user_id)
            let uid = result[0].user_id
            let nickname = result[0].nickname

            nickname
            //通过jwt生成token     npm i -s jsonwebtoken
            let token = jwt.sign(
                { uid ,nickname},
                PEIVATE_KEY,
                { expiresIn: EXPIRE_SIN }
            )
            data = {
                state: s,
                data: {
                    token: token,
                    userinfo: {
                        uid: result[0].id,
                        nickname: result[0].nickname,
                        avatar: result[0].avatar

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

/**
 * 互助相关
 * 
 */
//创建求助
exports.createhelp = (req, res) => {
    // console.log(req)
    let time = Date.now() - 8 * 60 * 60
    let info = {
        help_id: uuid.v1(),   //互助id 
        user_id: req.user.uid,//  用户di 
        help_title: req.body.help_title,// 标题   
        help_lable: req.body.help_lable,// 标签
        help_content: req.body.help_content,//内容  
        help_img: req.body.help_img,//图片
        createtime: time,//创建时间
        updatetime: time,//更新时间
        help_favour_num: 0,//点赞数    
        help_read_num: 0,//浏览量
        help_state: 0, //状态  
        help_istop: 0,//是否置顶
        help_ispublic: 0,//是否显示
    }
    let sql = 'insert into help set ?'
    db.base(sql, info, (result, error) => {
        data = {
            state: s,
            data: {}
        }
        res.send(data)
    })
}
//获取求助列表
exports.getwebhelplist = (req, res) => {
    console.log(req)
    let sql1 = ' select count(*) as count from help where user_id=?'
    let info1 = [req.user.uid]
    db.base(sql1, info1, (result) => {
        let count = result[0].count
        let page = (req.body.page - 1) * req.body.pagesize
        let pagesize = req.body.pagesize * 1
        let info = [req.user.uid, pagesize, page]
        let sql = 'select * from help where user_id=? limit ? offset ?'
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
//求助详情
exports.gethelpdetails = (req, res) => {
    console.log(req.body)
    let info = [req.body.id]
    let sql = 'select * from help where help_id=?'
    db.base(sql, info, (result) => {
        if (result.length == 0) {
            data = {
                state: e,
                data: {
                }
            }
        } else {
            data = {
                state: s,
                data: result[0]
            }
        }
        console.log(result)
        res.send(data);
    })
}
//修改求助
exports.updateehelp = (req, res) => {
    console.log(req.user)
    let info = [
        req.body.help_title,
        req.body.help_lable,
        req.body.help_content,
        req.body.help_img,
        req.user.uid,
        req.body.id]

    let sql = 'update help set help_title =?, help_lable=?,help_content=?,help_img=? where user_id =?and help_id=?'

    // let sql = `update help set help_title ='${req.body.help_title}', help_lable='${req.body.help_lable}' ,help_content='${req.body.help_content}',help_img='${req.body.help_img}',where user_id = '${req.user.uid}'and help_id='${req.body.id}'`
    db.base(sql, info, (result) => {
        if (result.length == 0) {
            data = {
                state: e,
                data: {
                }
            }
        } else {
            data = {
                state: s,
                data: result[0]
            }
        }
        console.log(result)
        res.send(data);
    })
}
//删除求助
exports.deletehelp = (req, res) => {
        let info = [req.body.help_id, req.user.uid]
    
        let sql = 'delete  from help where help_id=? and user_id=?'
        db.base(sql, info, (result) => {
            if (result.length == 0) {
                data = {
                    state: e,
                    data: {
                    }
                }
            } else {
                data = {
                    state: s,
                    data: {
                    }
                }
            }
            console.log(result)
            res.send(data);
        })
    }
/**
 * 
 * 活动相关
 * 
 */

//创建活动
exports.createactivity = (req, res) => {
    // console.log(req)
    let time = Date.now() - 8 * 60 * 60
    let info = {
        activity_id: uuid.v1(),   //活动id 
        user_id: req.user.uid,//  用户di 
        activity_title: req.body.activity_title,// 标题   
        activity_lable: req.body.activity_lable,// 标签
        activity_type: req.body.activity_type,// 类型
        activity_content: req.body.activity_content,//内容  
        activity_img: req.body.activity_img,//图片
        activity_impose:req.body.activity_impose,//是否限制人数
        createtime: time,//创建时间
        activity_num:req.body.activity_num,//人数
        activity_statetime:req.body.activity_statetime,//活动开始时间
        activity_endtime:req.body.activity_endtime,//活动结束时间
        updatetime: time,//更新时间
        activity_favour_num: 0,//点赞数    
        activity_read_num: 0,//浏览量
        activity_state: 0, //状态  
        activity_istop: 0,//是否置顶
        activity_ispublic: 0,//是否显示
    }
    let sql = 'insert into activity set ?'
    db.base(sql, info, (result, error) => {

        data = {
            state: s,
            data: {}
        }
        res.send(data)
    })
}
//获取活动列表
exports.getwebactivitylist = (req, res) => {
    // console.log(req)
    let sql1 = ' select count(*) as count from activity where user_id=?'
    let info1 = [req.user.uid]
    db.base(sql1, info1, (result) => {
        let count = result[0].count
        let page = (req.body.page - 1) * req.body.pagesize
        let pagesize = req.body.pagesize * 1
        let info = [req.user.uid, pagesize, page]
        let sql = 'select * from activity where user_id=? limit ? offset ?'
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
//活动详情
exports.getactivitydetails = (req, res) => {
    console.log(req.body)
    let info = [req.body.id]
    let sql = 'select * from activity where activity_id=?'
    db.base(sql, info, (result) => {
        if (result.length == 0) {
            data = {
                state: e,
                data: {
                }
            }
        } else {
            data = {
                state: s,
                data: result[0]
            }
        }
        console.log(result)
        res.send(data);
    })
}
//修改活动
exports.updateeactivity = (req, res) => {
    console.log(req.user)
    let info = [
        req.body.help_title,
        req.body.help_lable,
        req.body.help_content,
        req.body.help_img,
        req.user.uid,
        req.body.id]

    let sql = 'update help set help_title =?, help_lable=?,help_content=?,help_img=? where user_id =?and help_id=?'

    // let sql = `update help set help_title ='${req.body.help_title}', help_lable='${req.body.help_lable}' ,help_content='${req.body.help_content}',help_img='${req.body.help_img}',where user_id = '${req.user.uid}'and help_id='${req.body.id}'`
    db.base(sql, info, (result) => {
        if (result.length == 0) {
            data = {
                state: e,
                data: {
                }
            }
        } else {
            data = {
                state: s,
                data: result[0]
            }
        }
        console.log(result)
        res.send(data);
    })
}
//删除活动
exports.deleteactivity = (req, res) => {
        let info = [req.body.activity_id, req.user.uid]
    
        let sql = 'delete  from activity where activity_id=? and user_id=?'
        db.base(sql, info, (result) => {
            if (result.length == 0) {
                data = {
                    state: e,
                    data: {
                    }
                }
            } else {
                data = {
                    state: s,
                    data: {
                    }
                }
            }
            console.log(result)
            res.send(data);
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