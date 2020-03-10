const { query } = require('../../plugins/db.js')
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
exports.registered = async (req, res) => {
    let infogetuser = [req.body.username]
    let sqlgetuser = 'select * from user where username =?'
    const result = await query(sqlgetuser, infogetuser)
    if (result.length != 0) {
        data = {
            state: ep,
            data: {}
        }
    } else {
        let info = {
            user_id: uuid.v1(),   //用户id 
            username: req.body.username,//用户名
            password: req.body.password,//密码
            nickname: '该用户还没没有设置昵称',//昵称
            avatar: 'http://127.0.0.1:3000/uplodes/moren',
            realstate: '0'
        }
        info.password = md5(`${info.password}${PED_SALT}`)
        let sql = 'insert into user set ?'
        const result = await query(sql, info)
        data = {
            state: s,
            data: {}
        }
    }
    res.send(data)
}
//登录
exports.login = async (req, res) => {
    req.body.password = md5(`${req.body.password}${PED_SALT}`)
    let info = [req.body.username, req.body.password]
    let sql = 'select nickname,user_id,avatar from user where username=? and password=?'
    const result = await query(sql, info)
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
            { uid, nickname },
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

        console.log(result)
        res.send(data);
    }
}
//获取用户信息
exports.getuser = async (req, res) => {
    let info = [req.user.uid]
    let sql = 'select * from user where user_id =?'
    const result = await query(sql, info)
    data = {
        state: s,
        data: result[0]
    }
    res.send(data)
}
//修改用户信息
exports.updatauser = async (req, res) => {
    // console.log(req)
    if (req.body.m == "student") { 
        let info = [
            req.body.realname,
            req.body.studentid,
            req.body.studentcard,
            1,
            req.user.uid]
        console.log(info)
        let sql = 'update user set realname =?,studentid=?,studentcard=?,realstate=? where user_id =?'
        const result = await query(sql, info)
        data = {
            state: s,
            data: {}
        }
    }

    if (req.body.m == "company") {
        let info = [
            req.body.realname,
            req.body.studentid,
            req.body.studentcard,
            1,
            req.user.uid]
        console.log(info)
        let sql = 'update user set realname =?,studentid=?,studentcard=?,realstate=? where user_id =?'
        const result = await query(sql, info)

    }
    if (req.body.m == "user") {
        let info = [
            req.body.avatar,
            req.body.nickname,
            req.body.synopsis,
            req.body.mail,
            req.body.qq,
            req.body.phone,
            req.user.uid]
        console.log(info)
        let sql = 'update user set avatar =?,nickname=?,synopsis=?,mail=?,qq=?,phone=? where user_id =?'
        const result = await query(sql, info)
        if (result.affectedRows === 1) {
            let info = [req.user.uid]
            let sql = 'select * from user where user_id =?'
            const result = await query(sql, info)
            data = {
                state: s,
                data: {
                    userinfo: {
                        uid: result[0].id,
                        nickname: result[0].nickname,
                        avatar: result[0].avatar
                    }
                }
            }
        } else {
            data = {
                state: e,
                data: {}
            }
        }
    }

    res.send(data)
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
exports.createhelp = async (req, res) => {
    let data
    let time = Date.now() - 8 * 60 * 60
    let info = {
        help_id: uuid.v1(),   //互助id 
        user_id: req.user.uid,//  用户di 
        help_title: req.body.help_title,// 标题   
        help_lable: req.body.help_lable,// 分类
        help_tag: req.body.help_tag,// 分类
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
    const result = await query(sql, info)
    data = {
        state: s,
        data: {}
    }
    res.send(data)
}
//获取求助列表
exports.getwebhelplist = async (req, res) => {
    let sql1 = ' select count(*) as count from help where user_id=?'
    let info1 = [req.user.uid]
    const counts = await query(sql1, info1)
    let count = counts[0].count
    let page = (req.body.page - 1) * req.body.pagesize
    let pagesize = req.body.pagesize * 1
    let info = [req.user.uid, pagesize, page]
    let sql = 'select * from help where user_id=? limit ? offset ?'
    const result = await query(sql, info)
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
    // console.log(data)
    // console.log(result)
    res.send(data);
}
//求助详情
exports.gethelpdetails = async (req, res) => {
    console.log(req.body)
    let info = [req.body.id]
    let sql = 'select * from help where help_id=?'
    const result = await query(sql, info)
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
}
//修改求助
exports.updateehelp = async (req, res) => {
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
    const result = await query(sql, info)
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
}
//删除求助
exports.deletehelp = async (req, res) => {
    let info = [req.body.help_id, req.user.uid]

    let sql = 'delete  from help where help_id=? and user_id=?'
    const result = await query(sql, info)
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
    res.send(data)
}
/**
 * 
 * 活动相关
 * 
 */

//创建活动
exports.createactivity = async (req, res) => {
    // console.log(req)
    let time = Date.now() - 8 * 60 * 60
    let info = {
        activity_id: uuid.v1(),   //活动id 
        user_id: req.user.uid,//  用户di 
        activity_title: req.body.activity_title,// 标题   
        activity_lable: req.body.activity_lable,// 标签
        activity_type: req.body.activity_type,// 类型
        activity_content: req.body.activity_content,//内容  
        activity_locale: req.body.activity_locale,//地点
        activity_impose: req.body.activity_impose,//是否限制人数
        createtime: time,//创建时间
        activity_num: req.body.activity_num,//人数
        activity_statetime: req.body.activity_statetime,//活动开始时间
        activity_endtime: req.body.activity_endtime,//活动结束时间
        updatetime: time,//更新时间
        activity_favour_num: 0,//点赞数    
        activity_read_num: 0,//浏览量
        activity_state: 0, //状态  
        activity_istop: 0,//是否置顶
        activity_ispublic: 0,//是否显示
    }
    let sql = 'insert into activity set ?'
    const result = await query(sql, info)
    data = {
        state: s,
        data: {}
    }
    res.send(data)
}
//获取活动列表
exports.getwebactivitylist = async (req, res) => {
    // console.log(req)
    let sql1 = ' select count(*) as count from activity where user_id=?'
    let info1 = [req.user.uid]
    const counts = await query(sql1, info1)
    let count = counts[0].count
    let page = (req.body.page - 1) * req.body.pagesize
    let pagesize = req.body.pagesize * 1
    let info = [req.user.uid, pagesize, page]
    let sql = 'select * from activity where user_id=? limit ? offset ?'
    const result = await query(sql, info)
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
}
//活动详情
exports.getactivitydetails = async (req, res) => {
    console.log(req.body)
    let info = [req.body.id]
    let sql = 'select * from activity where activity_id=?'
    const result = await query(sql, info)
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
}
//修改活动
exports.updateactivity = async (req, res) => {
    // console.log(req.user)
    let updatetime = Date.now() - 8 * 60 * 60
    let info = [
        req.body.activity_title,
        req.body.activity_lable,
        req.body.activity_content,
        req.body.activity_locale,
        req.body.activity_type,
        req.body.activity_impose,
        req.body.activity_num,
        req.body.activity_statetime,
        req.body.activity_endtime,
        updatetime,
        req.user.uid,
        req.body.id]
    let sql = 'update activity set activity_title =?, activity_lable=?,activity_content=?,activity_locale=?,' +
        ' activity_type=?,activity_impose=?,activity_num=?,activity_statetime=?,activity_endtime=?,updatetime=? where user_id =?and activity_id=?'
    // let sql = `update help set help_title ='${req.body.help_title}', help_lable='${req.body.help_lable}' ,help_content='${req.body.help_content}',help_img='${req.body.help_img}',where user_id = '${req.user.uid}'and help_id='${req.body.id}'`
    const result = await query(sql, info)
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
}
//删除活动
exports.deleteactivity = async (req, res) => {
    let info = [req.body.activity_id, req.user.uid]

    let sql = 'delete  from activity where activity_id=? and user_id=?'
    const result = await query(sql, info)
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
}
//添加二手
exports.createoldstuff = async (req, res) => {
    // console.log(req)
    let time = Date.now() - 8 * 60 * 60
    let info = {
        oldstuff_id: uuid.v1(),   //二手id 
        user_id: req.user.uid,//  用户di 
        oldstuff_img: req.body.oldstuff_img,// 标题   
        oldstuff_name: req.body.oldstuff_name,// 标签
        oldstuff_lable: req.body.oldstuff_lable,// 类型
        oldstuff_price: req.body.oldstuff_price,//内容  

        oldstuff_content: req.body.oldstuff_content,//内容  
        createtime: time,//创建时间
        updatetime: time,//更新时间
        oldstuff_favour_num: 0,//点赞数    
        oldstuff_read_num: 0,//浏览量
        oldstuff_state: 0, //状态  
        oldstuff_istop: 0,//是否置顶
        oldstuff_ispublic: 0,//是否显示
    }
    let sql = 'insert into oldstuff set ?'
    const result = await query(sql, info)
    data = {
        state: s,
        data: {}
    }
    res.send(data)
}
//获取二手列表
exports.getweboldstufflist = async (req, res) => {
    // console.log(req)
    let sql1 = ' select count(*) as count from oldstuff where user_id=?'
    let info1 = [req.user.uid]
    const counts = await query(sql1, info1)
    let count = counts[0].count
    let page = (req.body.page - 1) * req.body.pagesize
    let pagesize = req.body.pagesize * 1
    let info = [req.user.uid, pagesize, page]
    let sql = 'select * from oldstuff where user_id=? limit ? offset ?'
    const result = await query(sql, info)
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
}
//活动详情
exports.getoldstuffdetails = async (req, res) => {
    console.log(req.body)
    let info = [req.body.id]
    let sql = 'select * from activity where activity_id=?'
    const result = await query(sql, info)
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
}