const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST, //'mysql'
    user: process.env.MYSQL_USER, //'root'
    password: process.env.MYSQL_ROOT_PASSWORD, //'cldockerfullstack'
    database: process.env.MYSQL_DATABASE, //'myapp'
    port: process.env.MYSQL_PORT // 3306
});
// 다른 파일에서도 해당 pool을 쓸 수 있도록 export
exports.pool = pool;