const mysql = require('mysql2');

// Contains configuration object
const pool = mysql.createPool({
    host: "localhost",
    user: "photoapp",
    password: "1234",
    database: "csc317project",
    connectionLimit: 50,
    waitForConnections: true,
    debug: false,
});

const promisePool = pool.promise();
module.exports = promisePool;