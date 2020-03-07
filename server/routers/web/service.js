const { query } = require('../../plugins/db.js')
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
//添加消息
let setnotice = async function (user_from, user_to, from_name, content_id, action, router) {
    let notice = {
        notice_id: uuid.v1(),// 消息 id 
        user_from: user_from,//发起者
        user_to: user_to,//接受者
        from_name: from_name,
        action: action,//动作
        content_id: content_id,//内容id
        router: router,//路由
        createtime: Date.now() - 8 * 60 * 60,//时间
        state: 0//状态
    }
    let sql = 'insert notice set ?'
    const result = await query(sql, notice)

}
//web获取求助列表
exports.webgetwebhelplist = async (req, res) => {
    console.log(req.body)

    let sql1 = ' select count(*) as count from help '
    let info1 = []
    const counts = await query(sql1, info1)
    let count = counts[0].count
    let pagesize = req.body.pagesize * 1
    let page = (req.body.page - 1) * pagesize
    let info = [pagesize, page]
    let sql = 'select help.help_id,help.help_title,help.createtime,help.help_read_num, user.nickname from help,user where help.user_id=user.user_id'
    if (req.body.lable != '') sql = `${sql} and help.help_lable='${req.body.lable}'`//有分类时
    if (req.body.tag != '') sql = `${sql} and help.help_tag like '%${req.body.tag}%'`//标签时
    sql = `${sql} limit ? offset ?`
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,
        count: count
    }
    // console.log(data)
    // console.log(result)
    res.send(data);
}
//求助文章详情
exports.gethelpcontent = async (req, res) => {
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
exports.setcomment = async (req, res) => {
    let time = Date.now() - 8 * 60 * 60
    let info = {
        comment_id: uuid.v1(),   //评论id 
        user_id: req.user.uid,//  用户di 
        content_id: req.body.content_id,//内容id
        comment_content: req.body.comment_content,//内容  
        createtime: time,//创建时间  
        comment_state: 0, //状态  
        comment_istop: 0,//是否置顶
        comment_ispublic: 0,//是否显示
    }
    let sql = 'insert comment set ?'
    const result = await query(sql, info)
    data = {
        state: s,
        data: {}
    }
    res.send(data)
}
//获取评论列表
exports.getcomment = async (req, res) => {
    let info = [req.body.content_id]//内容id
    console.log(info)
    let sql1 = ' select count(*) as count from comment where  content_id=?'
    const counts = await query(sql1, info)
    let count = counts[0].count
    let sql = 'select comment.comment_id ,comment.comment_content,comment.createtime,user.nickname,' +
        'user.user_id,user.avatar from user,comment where comment.user_id = user.user_id and content_id=? '
    'order by comment.createtime asc '
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,
        count: count
    }
    res.send(data)
}
//回复
exports.setreply = async (req, res) => {
    setnotice(req.user.uid, req.body.to_userid, req.body.tousernickname, req.body.comment_id, '回复', req.body.router)
    let time = Date.now() - 8 * 60 * 60
    let info = {
        reply_id: uuid.v1(),//留言id
        user_id: req.user.uid,//  用户di 
        comment_id: req.body.comment_id,//内容id
        reply_content: req.body.comment_content,//内容  
        tousernickname: req.body.tousernickname,
        touserid: req.body.touserid,
        createtime: time,//创建时间  
        reply_state: 0, //状态  
        reply_istop: 0,//是否置顶
        reply_ispublic: 0,//是否显示
    }
    let sql = 'insert reply set ?'
    const result = await query(sql, info)
    data = {
        state: s,
        data: {}
    }
    res.send(data)
}
//获取回复列表
exports.getreply = async (req, res) => {
    let info = [req.body.comment_id]//评论id
    console.log(req.body)
    let sql = 'select reply.reply_content ,reply.createtime,reply.touserid,reply.tousernickname,' +
        'user.user_id,user.avatar,user.nickname from user,reply where reply.user_id = user.user_id and comment_id=? ' +
        'order by reply.createtime asc '
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,
    }
    res.send(data)
}
//web获取活动列表
exports.webgetwebactivitylist = async (req, res) => {
    let sql1 = ' select count(*) as count from activity '
    let info1 = []
    const counts = await query(sql1, info1)
    let count = counts[0].count
    let pagesize = req.body.pagesize * 1
    let page = (req.body.page - 1) * pagesize
    let info = [pagesize, page]
    let sql = 'select activity_id,activity_title,createtime from activity  limit ? offset ?'
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
//web获取求助列表
exports.webgetwebactivitylist = async (req, res) => {
    console.log(req.body.lable)
    let sql1 = ' select count(*) as count from activity '
    let info1 = []
    const counts = await query(sql1, info1)
    let count = counts[0].count
    let pagesize = req.body.pagesize * 1
    let page = (req.body.page - 1) * pagesize
    let info = [pagesize, page]
    let sql = 'select * from activity,user where activity.user_id=user.user_id'
    if (req.body.lable != '') sql = `${sql} and activity.activity_lable='${req.body.lable}'`//有分类时
    sql = `${sql} limit ? offset ?`
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,
        count: count
    }
    // console.log(data)
    // console.log(result)
    res.send(data);
}
//web获取二手列表
exports.webgetweboldstufflist = async (req, res) => {
    console.log(req.body.lable)
    let sql1 = ' select count(*) as count from oldstuff '
    if (req.body.lable != '') sql1 = `${sql1} where oldstuff_lable='${req.body.lable}'`//有分类时
    let info1 = []
    const counts = await query(sql1, info1)
    let count = counts[0].count
    let pagesize = req.body.pagesize * 1
    let page = (req.body.page - 1) * pagesize
    let info = [pagesize, page]
    let sql = 'select * from oldstuff,user where oldstuff.user_id=user.user_id'
    if (req.body.lable != '') sql = `${sql} and oldstuff.oldstuff_lable='${req.body.lable}'`//有分类时
    sql = `${sql} limit ? offset ?`
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,
        count: count
    }
    // console.log(data)
    // console.log(result)
    res.send(data);
}
//求助二手详情
exports.getoldstuffcontent = async (req, res) => {
    let info = [req.body.id]
    let sql = 'select * from oldstuff,user where user.user_id=oldstuff.user_id and oldstuff.oldstuff_id=?'
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
//求助消息
exports.getnocitenmu = async (req, res) => {
    let sqlnoticenum = ' select count(*) as count from notice where user_to=? and state=0'
    let info = [req.user.uid]
    const count = await query(sqlnoticenum, info)
    let result = ''
    if (req.body.mun == '') {
        let sql = 'select * from nocite where user_to=?'
         result = await query(sql, info)
    }
    data={
        state: s,
        data: {
            list:result,
            count:count[0].count
        }
    }

    console.log(result)
    res.send(data);
}