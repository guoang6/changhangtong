var mysql = require('mysql');
const DBini = require('./DataBase.ini')
const dbmysql = DBini.dbmysql
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
  if (error) throw error;
  callback(results)

});
connection.end();
}