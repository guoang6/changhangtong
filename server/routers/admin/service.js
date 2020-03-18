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
//web获取求助列表
exports.contentexamine = async (req, res) => {
    console.log(req.body)
    let sql1 = ' select count(*) as count from help '
    let info1 = []
    const counts = await query(sql1, info1)
    let count = counts[0].count
    let pagesize = req.body.pagesize * 1
    let page = (req.body.page - 1) * pagesize
    let info = [pagesize, page]
    let sql = 'select * from help,user where help.user_id=user.user_id limit ? offset ?'
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
//获取用户信息
exports.getuserlist = async (req, res) => {
    let sqlcounts = ' select count(*) as count from user where 1=1 '
    let infocounts = []
    const counts = await query(sqlcounts, infocounts)
    let count = counts[0].count
    let info = [req.user.uid]
    let sql = 'select * from user where 1=1'
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,
        count: count
    }
    res.send(data)
}
exports.changeuserstate = async (req,res)=>{
   let info=[
    req.body.state,
    req.body.user_id
   ]
   let sql  = `update user set ${req.body.type}=? where user_id=?`
   const result = await query(sql, info)
   data = {
       state: s,
       data:{}
   }
   res.send(data)
}
//分类列表
exports.lablelist = async (req,res)=>{
    let info=[]
    let sql  = `select * from lable`
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,
        
    }
    res.send(data)
 }
 //修改分类
 exports.changelable = async (req,res)=>{
   let info=[
    req.body.lable,
    req.body.lable_id
   ]
   let sql  = `update lable set lable=? where lable_id =?`
   const result = await query(sql, info)
   data = {
       state: s,
       data:{}
   }
   res.send(data)
}