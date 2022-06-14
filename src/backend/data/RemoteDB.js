import { Sequelize, DataTypes } from 'sequelize';
import DataInterface from './DataInterface.js';
import { modelOpt, initModels } from 'database';

export default class RemoteDB extends DataInterface {

    constructor(host, port, name, user, passw, logging) {
        super();
        this._sq = new Sequelize(
            `mariadb://${user}:${passw}@${host}:${port}/${name}`,
            { logging: logging === 'true' }
        );
        initModels(this._sq, DataTypes, modelOpt);
        this._models = this._sq.models;

        try {
            this._sq.authenticate();
        } catch(err) {
            throw err;
        }
    }

    get prodInclude() {
        return [
            {
                model: this._models.product_prices,
                as: 'shops',
                required: true,
                attributes: [
                    'sid', 'name', 'price', 'shopUrl',
                    'shopIconUrl', 'productUrl', 'lastScan'
                ]
            },
            {
                model: this._models.tag,
                as: 'tags'
            }
        ];
    }

    get tagInclude(){
        return [
            {
                model: this._models.product,
                as: 'products'
            },
            {
                model: this._models.shop,
                as: 'shops'
            }
        ];
    }

    /**
     * Retrieve list of products with their prices from remote DB
     * TODO: Implement product sorting based on newest lowest price
     *
     * @param {Number} greater Lowest price in selected price range
     * @param {Number} less    Highest price in selected price range
     * @param {Number} limit   Product count in page. 0 -> no limit
     * @param {Number} page    Page number
     * @returns array JSON list of products and their prices in shops
     */
    async getProducts(greater, less, limit, page) {
        const qOpt = {
            include: this.prodInclude,
            ...(this.#createPaging(limit, page))
        };

        try {
            let res = await this._models.product.findAll(qOpt);
            return res;
        } catch (err) {
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
            return await this._models.shop.findAll(qOpt);
        } catch (err) {
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
        const qOpt = {
            include: this.tagInclude,
            ...(this.#createPaging(limit, page))
        };

        try {
            return await this._models.tag.findAll(qOpt);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Retrieves single product with all it's prices.
     *
     * @param {Number} id pid (product ID)
     * @returns Object JSON formatted product with its prices in shops
     */
    async getProduct(id) {
        const qOpt = {
            include: this.prodInclude
        };

        try {
            return await this._models.product.findByPk(id, qOpt);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Retrieves single shop.
     *
     * @param {Number} id sid (shop ID)
     * @returns Object JSON formatted shop
     */
    async getShop(id) {
        try {
            return await this._models.shop.findByPk(id);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Retrieves single tag.
     *
     * @param {Number} id sid (shop ID)
     * @returns Object JSON formatted shop
     */
    async getTagByID(id) {
        const qOpt = {
            include: this.tagInclude,
        };

        try {
            return await this._models.tag.findByPk(id, qOpt);
        } catch (err) {
            throw err;
        }
    }

    #createPaging(limit, page) {
        return limit && {
            limit: limit,
            ...(page && { offset: limit * page})
        };
    }
}
