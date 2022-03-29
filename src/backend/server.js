require('dotenv').config();

const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USR, DB_PSW } = process.env;
console.log({ DB_HOST, DB_PORT, DB_NAME, DB_USR, DB_PSW });

const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USR,
    password: DB_PSW,
    connectionLimit: 5
});

// async function asyncRead() {
//     let conn;
//     try {
//         conn = await pool.getConnection();
//         const rows = await conn.query("select * from hello_world");
//         rows.forEach(row => {
//             console.log(row);
//         });
//         await conn.end();
//         process.exit(0);
//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) return conn.end();
//     }
// }

// asyncRead().catch(console.error);

const express = require('express');
var app = express();
app.listen(
    PORT,
    () => console.log(`LIVE: http://localhost:${PORT}/product`)
);

app.get('/product', (req, res) => {
    const { id } = req.params;
    res.status(200).send({
        name: `${id}`
    });
});
