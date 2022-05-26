import { Sequelize, DataTypes } from 'sequelize';
import DataInterface from './DataInterface.js';
import ProductModel from './ProductModel.js';
import ProductPricesModel from './ProductPricesModel.js';
import ShopModel from './ShopModel.js';

const modelOpt = {
    timestamps: false,
    freezeTableName: true
};

export default class RemoteDB extends DataInterface {

    constructor(host, port, name, user, passw) {
        super();
        this._sq = new Sequelize(
            `mariadb://${user}:${passw}@${host}:${port}/${name}`
        );
        this._models = {}
        this._models.products = this._sq.define('product', ProductModel, modelOpt);
        this._models.shops = this._sq.define('shop', ShopModel, modelOpt);
        this._models.productPrices = this._sq.define('product_prices', ProductPricesModel, modelOpt);
        this._models.combinedTags = this._sq.define('combined_tags', {
            tid: {
                type: DataTypes.INTEGER
            },
            pid: {
                type: DataTypes.INTEGER
            },
            sid: {
                type: DataTypes.INTEGER
            }
        }, modelOpt);

        this._models.products.hasMany(this._models.productPrices, {
            as: 'shops',
            foreignKey: {
                name: 'pid',
                allowNull: false
            }
        });

        try {
            this._sq.sync();
        } catch(err) {
            throw err;
        }
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
            include: {
                model: this._models.productPrices,
                as: 'shops',
                required: true,
                attributes: [
                    'sid', 'name', 'price', 'url',
                    'shopIconUrl', 'productUrl', 'lastScan'
                ]
            },
            ...(this.#createPaging(limit, page))
        };

        try {
            let res = await this._models.products.findAll(qOpt);
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
            return await this._models.shops.findAll(qOpt);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Retrieve list of shops from remote DB
     * TODO: Create tags model (combined_tags table)
     *
     * @param {Number} limit   Product count in page. 0 -> no limit
     * @param {Number} page    Page number
     * @returns array JSON list of products and their prices in shops
     */
    async getTags(limit, page) {
        const qOpt = {
            ...(this.#createPaging(limit, page))
        };

        try {
            return await this._models.combinedTags.findAll(qOpt);
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
        const { eq } = Sequelize.Op;
        const qOpt = {
            where: {
                pid: { [eq]: id }
            },
            include: {
                model: this._models.productPrices,
                as: 'shops',
                attributes: [
                    'sid', 'name', 'price', 'url',
                    'shopIconUrl', 'productUrl', 'lastScan'
                ]
            }
        };

        try {
            return await this._models.products.findOne(qOpt);
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
        const { eq } = Sequelize.Op;
        const qOpt = {
            where: {
                sid: { [eq]: id }
            }
        };

        try {
            return await this._models.shops.findOne(qOpt);
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
        return {};
        const { eq } = Sequelize.Op;
        const qOpt = {
            where: {
                tid: { [eq]: id }
            }
        };

        try {
            return await this._models.tags.findOne(qOpt);
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
