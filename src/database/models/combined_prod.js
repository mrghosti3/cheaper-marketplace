import { sname } from "./shop.js";
import { pname } from "./product.js";
import { scname } from "./scan.js"

export const cpname = 'product_prices';

export const cpcreate = (sequelize, DataTypes, modelOpt) => {
    const cpmodel = {
        pid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: pname,
                key: 'pid',
            }
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: pname,
                key: 'name',
            }
        },
        productIconUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
            references: {
                model: pname,
                key: 'image_url',
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
        productUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
            references: {
                model: pname,
                key: 'prod_url',
            }
        }, 
        shopUrl: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: 'http://www.domain.lt',
            references: {
                model: sname,
                key: 'domain',
            }
        },
        shopIconUrl: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: 'http://www.domain.lt/product_image_path',
            references: {
                model: sname,
                key: 'image_url',
            }
        },
        scanHistory: {
            type: DataTypes.TIME,
            references: {
                model: scname,
                key: 'lastScan',
            }
        },
        priceHistory: {
            type: DataTypes.DECIMAL,
            references: {
                model: scname,
                key: 'price',
            }
        },

    };

    const cpinst = sequelize.isDefined(cpname) ? sequelize.model(cpname)
        : sequelize.define(cpname, cpmodel, { ...modelOpt });

    // sequelize.model(pname).hasMany(cpinst, {
    //     as: 'shops',
    //     foreignKey: {
    //         name: 'pid',
    //         allowNull: false
    //     }
    // });

    return { cpname, cpmodel, cpinst };
}