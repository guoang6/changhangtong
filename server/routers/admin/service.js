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
const en = {
    "type": 'ERROE_NO_ AUTHORITY',
    "msg": "没有权限"
}
const ep = {
    "type": 'ERROR_PARAMS_EXIST',
    "msg": "用户名重复"
}
//添加账号
exports.registered = async (req, res) => {
    let infogetuser = [req.body.username]
    let sqlgetuser = 'select * from admin where username =?'
    const result = await query(sqlgetuser, infogetuser)
    if (result.length != 0) {
        data = {
            state: ep,
            data: {}
        }
    } else {
        let time = Date.now() - 8 * 60 * 60
        let info = {
            user_id: uuid.v1(),   //用户id 
            username: req.body.username,//用户名
            password: req.body.password,//密码
            nickname: '管理员',
            user_createtime: time,//创建时间
            isfk: '0',
            isgl: '0',
            issh: '0',
            isyh: '0',
            user_state: '1',
        }
        info.password = md5(`${info.password}${PED_SALT}`)
        let sql = 'insert into admin set ?'
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
    let sql = 'select * from admin where username=? and password=?'
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
        let username = result[0].username
        let jurisdiction = {
            isrz: result[0].isrz,
            isgl: result[0].isgl,
            issh: result[0].issh,
            isyh: result[0].isfk,
            user_state: result[0].user_state,
        }
        //通过jwt生成token     npm i -s jsonwebtoken
        let token = jwt.sign(
            { uid, username, jurisdiction },
            PEIVATE_KEY,
            { expiresIn: EXPIRE_SIN }
        )
        data = {
            state: s,
            data: {
                token: token,
                userinfo: {
                    uid: uid,
                    nickname: nickname,
                    username: username,
                    jurisdiction: jurisdiction
                }
            }
        }//返回登录成功
        console.log(data)
        res.send(data);
    }
}
//修改密码
exports.changepassword = async (req, res) => {
    console.log(req.body)
    if(req.body.type=='adminadmin'){
        let info = [req.body.newpassword, req.body.username]
        info.newpassword = md5(`${info.password}${PED_SALT}`)
        let sql = 'update admin set  password=? where username =?'
        const result = await query(sql, info)
        console.log(result)
        data = {
            state: s,
            data: {}
        }
        res.send(data)
    }
}

//管理员授权
exports.changeadminstate = async (req, res) => {
    if (req.user.username = 'guoang') {
        let info = [
            req.body.isfk,
            req.body.isyh,
            req.body.isgl,
            req.body.issh,
            req.body.user_id
        ]
        console.log(info)
        let sql = 'update admin set isfk =?,isyh=?,isgl=?,issh=? where user_id =?'
        const result = await query(sql, info)
        data = {
            state: s,
            data: {}
        }
    } else {
        data = {
            state: en,
            data: {}
        }
    }

    res.send(data)
}
//添加消息
let setnotice = async function (user_from, user_to, nickname, content_id, content_name, action, router) {
    let notice = {
        notice_id: uuid.v1(),// 消息 id 
        user_from: user_from,//发起者
        nickname: nickname,
        user_to: user_to,//接受者
        content_name: content_name,
        action: action,//动作
        content_id: content_id,//内容id
        router: router,//路由
        createtime: Date.now() - 8 * 60 * 60,//时间
        state: 0//状态
    }
    let sql = 'insert notice set ?'
    const result = await query(sql, notice)


}
//数据分析
exports.numbering = async (req, res) => {
    let info = []
    let usersql = `select from_unixtime(user_createtime/1000, '%Y-%m') as time,  count(user_id) as num from user group by time order by time`
    const user = await query(usersql, info)
    let commentsql = `select from_unixtime(comment_createtime/1000, '%Y-%m') as time,  count(comment_id) as num from  comment group by time order by time`
    const comment = await query(commentsql, info)
    const count = await query(`SELECT
	table_name,
	concat(
		TRUNCATE (data_length / 1024 / 1024, 2),
		' MB'
	) AS data_size,
	table_rows
FROM
	information_schema. TABLES
WHERE
	TABLE_SCHEMA = 'changhangtong'
`, info)
    data = {
        state: s,
        data: {
            user: user,
            comment: comment,
            count: count
        },

    }
    res.send(data)
}
//获取求助列表
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
//获取活动列表
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
    let pagesize = req.body.pagesize * 1
    let page = (req.body.page - 1) * pagesize
    let info = [pagesize, page]
    // let info = [req.user.uid]
    let sql = 'select * from user where 1=1  limit ? offset ?'
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,
        count: count
    }
    res.send(data)
},
    //获取管理员列表
    exports.getadminlist = async (req, res) => {
        console.log(req.body.search)
        let sqlcounts = ' select count(*) as count from admin where 1=1 '
        if (req.body.user !== '') sqlcounts = `${sqlcounts} and username like '%${req.body.user}%'`
        if (req.body.state !== '') sqlcounts = `${sqlcounts} and user_state ='${req.body.state}'`
        let infocounts = []
        const counts = await query(sqlcounts, infocounts)
        let count = counts[0].count
        let pagesize = req.body.pagesize * 1
        let page = (req.body.page - 1) * pagesize
        let info = [pagesize, page]
        // let info = [req.user.uid]
        let sql = 'select * from admin where 1=1  '
        if (req.body.user !== '') sql = `${sql} and username like '%${req.body.user}%'`
        if (req.body.state !== '') sql = `${sql} and user_state ='${req.body.state}'`
        sql = `${sql} limit ? offset ?`
        const result = await query(sql, info)
        console.log(result)
        data = {
            state: s,
            data: result,
            count: count
        }
        res.send(data)
    },
    exports.changeuserstate = async (req, res) => {
        console.log(req.body)

        let info = [
            req.body.state,
            req.body.user_id
        ]
        let sql = `update user set ${req.body.type}=? where user_id=?`
        const result = await query(sql, info)
        if (req.body.type === 'companystate' && req.body.state == 3) {
            const resultonly = await query('select * from company where user_id=?', [req.body.user_id])
            if (resultonly.length == 0) {
                let time = Date.now() - 8 * 60 * 60
                let info = {
                    company_id: uuid.v1(),   //公司idid 
                    user_id: req.body.user_id,//  用户di 
                    company_name: req.body.company_name,// 公司名称 
                    company_createtime: time,//创建时间
                    company_updatetime: time,//更新时间
                    company_favour_num: 0,//点赞数    
                    company_read_num: 0,//浏览量
                    company_state: 0, //状态  
                    company_istop: 0,//是否置顶
                    company_ispublic: 0,//是否显示
                }
                let sql = 'insert into company set ?'
                const result = await query(sql, info)
            }
        }
        data = {
            state: s,
            data: {}
        }
        res.send(data)
    }
//分类列表
exports.lablelist = async (req, res) => {
    let info = []
    let sql = `select * from lable`
    if (req.body.lable_name !== '') sql = `${sql} where lable_name='${req.body.lable_name}'`
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,

    }
    res.send(data)
}
//走马灯修改
exports.changecarousel = async (req, res) => {
    console.log(req.body)
    let time = Date.now() - 8 * 60 * 60
    let carousel_id = uuid.v1()
    let sql
    let info = [req.body.carousel_img, req.body.carousel_url, time, carousel_id]
    if (req.body.carousel_id == '') sql = `insert carousel  set carousel_img=?,carousel_url=?,carousel_createtime=?,carousel_id=?`
    else sql = `update carousel  set carousel_img=?,carousel_url=? where carousel_id='${req.body.carousel_id}'`
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,

    }
    res.send(data)
}
//走马灯列表
exports.carousellist = async (req, res) => {
    let info = []
    let sql = `select * from carousel ORDER BY carousel_createtime DESC`
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,

    }
    res.send(data)
}

//删除走马灯
exports.deletecarouse = async (req, res) => {
    let info = [req.body.carousel_id]
    let sql = `delete  from carousel where carousel_id=? `
    const result = await query(sql, info)
    data = {
        state: s,
        data: result,

    }
    res.send(data)
}
//修改分类
exports.changelable = async (req, res) => {
    let info = [
        req.body.lable,
        req.body.lable_id
    ]
    let sql = `update lable set lable=? where lable_id =?`
    const result = await query(sql, info)
    data = {
        state: s,
        data: {}
    }
    res.send(data)
}

//发布公告
exports.setannouncement = async (req, res) => {
    let time = Date.now() - 8 * 60 * 60

    let info = {
        announcement_id: uuid.v1(),
        announcement_name: req.body.announcement_name,
        announcement_content: req.body.announcement_content,
        announcement_type: req.body.type,
        content_id: req.body.content_id,
        announcement_createtime: time,
    }
    console.log(req.body)
    let sql = 'insert into announcement set ?'
    const result = await query(sql, info)
    let userlist, user_from = "", action, router, nickname
    if (req.body.type === 'activity') {
        userlist = await query('select user_id from joins where content_id=?', [req.body.content_id])
        router = 'activitycontent'
        user_from = req.user.user_id
        nickname = req.user.nickname
        action = '发布新的活动通知'
    }
    for (let i = 0; i < userlist.length; i++) {
        setnotice(user_from, userlist[i].user_id, nickname, req.body.content_id, req.body.contentname, action, router)
    }

    data = {
        state: s,
        data: {}
    }
    res.send(data)
}
//获取公告
exports.announcementlist = async (req, res) => {
    let info = [req.body.content_id]
    let sql = `select * from announcement where content_id=? ORDER BY announcement_createtime DESC`
    const result = await query(sql, info)

    data = {
        state: s,
        data: result,

    }
    res.send(data)
}