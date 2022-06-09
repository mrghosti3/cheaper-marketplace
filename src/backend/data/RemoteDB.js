import { Sequelize, DataTypes } from 'sequelize';
import CombinedTagsModel from './CombinedTagsModel.js';
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
        this._sq.define('product', ProductModel, modelOpt);
        this._sq.define('shop', ShopModel, modelOpt);
        this._sq.define('product_prices', ProductPricesModel, modelOpt);

        this._sq.define('combined_tags', CombinedTagsModel, modelOpt);
        this._sq.define('tag', {
            tid: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            term: {
                type: DataTypes.STRING(50)
            }
        }, modelOpt);

        this._models = this._sq.models;

        // product x product_prices
        this._models.product.hasMany(this._models.product_prices, {
            as: 'shops',
            foreignKey: {
                name: 'pid',
                allowNull: false
            }
        });

        // combined_tags x tag
        this._models.combined_tags.belongsTo(this._models.tag, {
            as: 'tag',
            foreignKey: {
                name: 'tid',
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
                model: this._models.product_prices,
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
            include: {
                model: this._models.tag,
                as: 'tag',
                // required: true
            },
            ...(this.#createPaging(limit, page))
        };

        try {
            return await this._models.combined_tags.findAll(qOpt);
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
                model: this._models.product_prices,
                as: 'shops',
                attributes: [
                    'sid', 'name', 'price', 'url',
                    'shopIconUrl', 'productUrl', 'lastScan'
                ]
            }
        };

        try {
            return await this._models.product.findOne(qOpt);
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
            return await this._models.shop.findOne(qOpt);
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
