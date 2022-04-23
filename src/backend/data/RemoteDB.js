import DataInterface from "./DataInterface.js";

export default class RemoteDB extends DataInterface {
    #pool;

    constructor(host, port, name, user, passw) {
        this.#pool = createPool({
            host: host,
            port: port,
            database: name,
            user: user,
            password: passw,
            connectionLimit: 5
        });
    }

    getProducts() {
        return {
            hello: "world"
        };
    }

    getShops() {}
}

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
