import { sname } from "./shop.js";
import { pname } from "./product.js";

export const ppname = 'product_prices';

export const ppcreate = (sequelize, DataTypes, modelOpt) => {
    const ppmodel = {
        pid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: pname,
                key: 'pid',
            }
        },
        sid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: sname,
                key: 'sid',
            }
        },
        lastScan: {
            type: DataTypes.TIME,
            primaryKey: true,
            field: 'last_scan'
        },
        price: DataTypes.DECIMAL,
        name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        shopUrl: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: 'http://www.domain.lt',
            field: 'domain'
        },
        shopIconUrl: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: 'http://www.domain.lt/product_image_path',
            field: 'shop_image_url'
        },
        productUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'product_url'
        }
    };

    const ppinst = sequelize.isDefined(ppname) ? sequelize.model(ppname)
        : sequelize.define(ppname, ppmodel, { ...modelOpt });

    sequelize.model(pname).hasMany(ppinst, {
        as: 'shops',
        foreignKey: {
            name: 'pid',
            allowNull: false
        }
    });

    return { ppname, ppmodel, ppinst };
}
