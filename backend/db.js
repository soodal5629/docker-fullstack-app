const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'cl',
    database: 'myapp'
});
// 다른 파일에서도 해당 pool을 쓸 수 있도록 export
exports.pool = pool;