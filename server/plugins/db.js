var mysql = require('mysql');
const {dbmysql} = require('./DataBase.ini')
const {debug} = require('./config.js')//debug配置文件
exports.base = (sql,data,callback) =>{


var connection = mysql.createConnection({
  host: dbmysql.host,
  user: dbmysql.user,
  password: dbmysql.password,
  database: dbmysql.database,
  port: dbmysql.port
});
 
connection.connect();

connection.query(sql,data,function (error, results, fields) {
  if(error){
    debug &&console.log('数据库操作失败:'+JSON.stringify(error))
    return
  }
  else{
    debug && console.log('数据库操作成功:'+JSON.stringify(results))
  }
  callback(results,error)
});
connection.end();
}