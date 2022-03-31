import { createPool } from 'mariadb';

const { DB_HOST, DB_PORT, DB_NAME, DB_USR, DB_PSW } = process.env;

const pool = createPool({
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


