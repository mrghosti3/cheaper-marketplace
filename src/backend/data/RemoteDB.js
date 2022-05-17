import { Sequelize, DataTypes } from 'sequelize';
import DataInterface from './DataInterface.js';

const ERROR_MSG_START = "ERROR RemoteDB ";

const modelOpt = {
    timestamps: false,
    freezeTableName: true
};

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

        try {
            this._sq.sync();
        } catch(err) {
            err.text = ERROR_MSG_START + "constructor: " + err.text;
            throw err;
        }
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
                p => conn.query(queries[1], p.pid)
            );

            for (let i in productPricesQueries) {
                res[i].shops = await productPricesQueries[i];
            }

            await conn.end();
        } catch (err) {
            err.text = ERROR_MSG_START + "getProducts: " + err.text;
            throw err;
        }
    }

    /**
     * Retrieve list of shops from remote DB
     *
     * @param {Number} limit   Product count in page. 0 -> no limit
     * @param {Number} page    Page number
     * @returns array JSON list of products and their prices in shops
     */
    async getShops(limit, page) {
        const qOpt = {
            ...(this.#createPaging(limit, page))
        };

        try {
            return await this._models.shops.findAll(qOpt);
        } catch (err) {
            err.text = ERROR_MSG_START + "getShops: " + err.text;
            throw err;
        }
    }

    /**
     * Retrieve list of shops from remote DB
     *
     * @param {Number} limit   Product count in page. 0 -> no limit
     * @param {Number} page    Page number
     * @returns array JSON list of products and their prices in shops
     */
    async getTags(limit, page) {
        let res = [];

        try {
            const conn = await createConnection(this.#connConfig);
            const tagQuery = queries[3] + this.#createPaging(limit, page);
            res = (await conn.query(tagQuery)).slice(0);
            await conn.end();
        } catch (err) {
            err.text = ERROR_MSG_START + "getTags: " + err.text;
            throw err;
        }

        return res;
    }

    /**
     * Retrieves single product with all it's prices.
     *
     * @param {Number} id pid (product ID)
     * @returns Object JSON formatted product with its prices in shops
     */
    async getProduct(id) {
        let res = null;

        try {
            const conn = await createConnection(this.#connConfig);
            const queryProduct = queries[4];
            res = (await conn.query(queryProduct, id))[0];

            res.shops = await conn.query(queries[1], id);

            await conn.end();
        } catch (err) {
            err.text = ERROR_MSG_START + "getProducts: " + err.text;
            throw err;
        }

        return res;
    }

    /**
     * Retrieves single shop.
     *
     * @param {Number} id sid (shop ID)
     * @returns Object JSON formatted shop
     */
    async getShop(id) {
        let res = null;

        try {
            const conn = await createConnection(this.#connConfig);
            const queryProduct = queries[5];
            res = (await conn.query(queryProduct, id))[0];

            await conn.end();
        } catch (err) {
            err.text = ERROR_MSG_START + "getShop: " + err.text;
            throw err;
        }

        return res;
    }

    /**
     * Retrieves single tag.
     *
     * @param {Number} id sid (shop ID)
     * @returns Object JSON formatted shop
     */
    async getTag(id) {
        let res = null;

        try {
            const conn = await createConnection(this.#connConfig);
            const queryProduct = queries[6];
            res = (await conn.query(queryProduct, id))[0];

            await conn.end();
        } catch (err) {
            err.text = ERROR_MSG_START + "getTag: " + err.text;
            throw err;
        }

        return res;
    }

    #createPaging(limit, page) {
        return limit && {
            limit: limit,
            ...(page && { offset: limit * page})
        };
    }
}
