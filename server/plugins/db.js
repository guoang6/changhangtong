var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '120.27.242.132',
  user     : 'root',
  password : 'Ga-384019118',
  database : 'changhangtong'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
