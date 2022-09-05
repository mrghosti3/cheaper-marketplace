import { sname } from "./shop.js";
import { pname } from "./product.js";
import { scname } from "./scan.js"

export const cpname = 'combined_prod';

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
            allowNull: false,
            references: {
                model: pname,
                key: 'name',
            }
        },
        productIconUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            references: {
                model: pname,
                key: 'image_url',
            }
        },   
        productUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            references: {
                model: pname,
                key: 'prod_url',
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

    return { cpname, cpmodel, cpinst };
}