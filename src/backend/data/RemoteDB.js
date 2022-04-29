import { readFileSync } from 'fs';
import { createConnection } from 'mariadb';
import DataInterface from './DataInterface.js';

const queries = JSON.parse(readFileSync(process.env.QUERIES, 'utf8'));
const ERROR_MSG_START = "ERROR RemoteDB ";

export default class RemoteDB extends DataInterface {
    #connConfig;

    constructor(host, port, name, user, passw) {
        super();
        this.#connConfig = {
            host: host,
            port: port,
            database: name,
            user: user,
            password: passw,
            connectionLimit: 10
        };
        console.log(this.#connConfig);
    }

    /**
     * Retrieve list of products with their prices from remote DB
     *
     * @param {Number} greater Lowest price in selected price range
     * @param {Number} less    Highest price in selected price range
     * @param {Number} limit   Product count in page. 0 -> no limit
     * @param {Number} page    Page number
     * @returns array JSON list of products and their prices in shops
     */
    async getProducts(greater, less, limit, page) {
        let res = [];

        try {
            const conn = await createConnection(this.#connConfig);
            const queryProducts = queries[0] + this.#createPaging(limit, page);
            res = (await conn.query(queryProducts)).slice(0);

            let productPricesQueries = res.map(
                p => conn.query(queries[4].replaceAll('{0}', p.pid))
            );

            for (let i in productPricesQueries) {
                res[i].shops = await productPricesQueries[i];
            }

            await conn.end();
        } catch (err) {
            err.text = ERROR_MSG_START + "getProducts: " + err.text;
            throw err;
        }

        // if (less > 0 && greater < less) {
        //     // NOTE: write a query in SQL
        // }
        return res;
    }

    /**
     * Retrieve list of shops from remote DB
     *
     * @param {Number} limit   Product count in page. 0 -> no limit
     * @param {Number} page    Page number
     * @returns array JSON list of products and their prices in shops
     */
    async getShops(limit, page) {
        let shopQuery = queries[1] + this.#createPaging(limit, page);
        let res = [];

        try {
            const conn = await createConnection(this.#connConfig);
            res = (await conn.query(shopQuery)).slice(0);
            await conn.end();
        } catch (err) {
            err.text = ERROR_MSG_START + "getShops: " + err.text;
            throw err;
        }

        return res;
    }

    async getTags(limit, page) {
        let tagQuery = queries[2] + this.#createPaging(limit, page);
        let res = [];

        try {
            const conn = await createConnection(this.#connConfig);
            res = (await conn.query(tagQuery)).slice(0);
            await conn.end();
        } catch (err) {
            err.text = ERROR_MSG_START + "getTags: " + err.text;
            throw err;
        }

        return res;
    }

    #createPaging(limit, page) {
        if (limit > 0 && page > 0) {
            let limitFrom = limit * page;
            return ` LIMIT ${limit} OFFSET ${limitFrom};`;
        }

        return '';
    }
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
