const mysql = require('mysql');
const { dbmysql } = require('./DataBase.ini')//数据库配置文件
const { debug } = require('./config.js')//debug配置文件
function connection() {
  return mysql.createConnection({
    host: dbmysql.host,//地址
    user: dbmysql.user,//用户名
    password: dbmysql.password,
    database: dbmysql.database,//数据库名
    port: dbmysql.port//端口
  })
}
function query(sql, data) {
  const conn = connection()
  return new Promise((resovle, reject) => {//返回Promise对象
    debug && console.log('sql语句：' + JSON.stringify(sql))
    try {
      conn.query(sql, data, function (error, results, fields) {
        if (error) {
          reject(error)
          debug && console.log('数据库操作失败:' + JSON.stringify(error))
          return
        }
        else {
          resovle(results)
          debug && console.log('数据库操作成功:' + JSON.stringify(results))
        }
      });
    } catch (e) {
      reject(e)//抛出异常
    }
    finally {
      conn.end()
    }
  })
}
module.exports ={
  query
}