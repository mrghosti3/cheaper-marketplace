import { createPool } from 'mariadb';

const { ENV } = process.env;

/**
 * @class DataInterface
 */
class DataInterface {
    async getProducts() {
        throw new Error("Method 'getProducts()' must be implemented.");
    }
    async getShops() {
        throw new Error("Method 'getShops()' must be implemented.");
    }
}

/**
 * @class DevDB
 * @extends {DataInterface}
 */
class DevDB extends DataInterface {
    getProducts() {
        const domains = [
            'www.rimi.lt',
            'www.maxima.lt'
        ];
        return [
            {
                pid: 1,
                name: "Bananai",
                product_icon_path: domains[0] + '/path',
                shops: [
                    {
                        sid: 1,
                        price: 1.00,
                        product_path: domains[0] + '/path',
                        shop_icon_path: domains[0] + '/path',
                        last_scan: '2022-04-07'
                    },
                    {
                        sid: 2,
                        price: 1.00,
                        product_path: domains[1] + '/path',
                        shop_icon_path: domains[1] + '/path',
                        last_scan: '2022-04-07'
                    }
                ]
            },
            {
                pid: 2,
                name: "Kava",
                product_icon_path: domains[0] + '/path',
                shops: [
                    {
                        sid: 1,
                        price: 1.00,
                        product_path: domains[0] + '/path',
                        shop_icon_path: domains[0] + '/path',
                        last_scan: '2022-04-07'
                    },
                    {
                        sid: 2,
                        price: 1.00,
                        product_path: domains[1] + '/path',
                        shop_icon_path: domains[1] + '/path',
                        last_scan: '2022-04-07'
                    }
                ]
            }
        ];
    }
}

/**
 * @class RemoteDB
 * @extends {DataInterface}
 */
class RemoteDB extends DataInterface {
    #pool;

    constructor() {
        const { DB_HOST, DB_PORT, DB_NAME, DB_USR, DB_PSW } = process.env;
        this.pool = createPool({
            host: DB_HOST,
            port: DB_PORT,
            database: DB_NAME,
            user: DB_USR,
            password: DB_PSW,
            connectionLimit: 5
        });
    }

    getProducts() {
        return {
            hello: "world"
        };
    }
}

export default function() {
    return (ENV == "dev") ? new DevDB() : new RemoteDB();
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


