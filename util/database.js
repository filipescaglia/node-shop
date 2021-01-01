const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'node-complete',
    user: 'root',
    password: 'root'
});

module.exports = pool.promise();