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
        } catch (err) {
            throw err;
        }
    }

    get prodInclude() {
        return [
            {
                model: this._models.product,
                as: 'products',
                required: true,
                attributes: [
                    'pid', 'sid', 'name', 'prodUrl', 'imageUrl'
                ]
            },
            {
                model: this._models.shop,
                as: 'shops',
                required: true,
                attributes: [
                    'sid', 'name', 'domain', 'imageUrl'
                ]
            },
            {
                model: this._models.scan,
                as: 'scans',
                required: true,
                attributes: [
                    'pid', 'lastScan', 'price'
                ]
            }
        ];
    }

    /**
     * Retrieve list of products with their prices from remote DB
     *
     * @param {Number} greater Lowest price in selected price range
     * @param {Number} less    Highest price in selected price range
     * @param {Number} page    Page number
     * @returns array JSON list of products and their prices in shops
     */
    async search(query, greater, less, page) {
        const { like } = Sequelize.Op;
        const qOpt = {
            where: {
                "$product.name$": {
                    [like]: `%${query}%`
                }
            },
            include: this.prodInclude,
            ...(this.#createPaging(20, page))
        };

        try {
            return await this._models.product.findAll(qOpt);
        } catch (err) {
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
        let entries = [];
        entries.shop = [];
        entries.scans = [];
        const qOpt = {
            ...(this.#createPaging(20, page))
        };
        try {
            let products = await this._models.product.findAll(qOpt);
            let shops = await this._models.shop.findAll(qOpt);
            let scans = await this._models.scan.findAll(qOpt);

            for (const i in products) {
                entries.push({
                    pid: products[i].pid,
                    name: products[i].name,
                    productIconUrl: products[i].imageUrl,
                    productUrl: products[i].prodUrl,
                });
            }
            for (const i in shops) {
                entries.shop.push({
                    sid: shops[i].sid,
                    name: shops[i].name,
                    url: shops[i].domain,
                    shopIconUrl: shops[i].imageUrl
                });
            }
            for (const i in scans) {
                entries.scans.push({
                    price: scans[i].price,
                    lastScan: scans[i].lastScan,
                    priceHistory: scans[i].price,
                    scanHistory: scans[i].lastScan
                });
            }
            
        } catch (err) {
            throw err;
        }
        return entries;
    }


    #createPaging(limit, page) {
        return limit && {
            limit: limit,
            ...(page && { offset: limit * page })
        };
    }
}
