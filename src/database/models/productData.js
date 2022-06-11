import { sname } from "./shop.js";
import { pname } from "./product.js";

export const pdname = 'pdata';

export const pdcreate = (sequelize, DataTypes, modelOpt) => {
    const pdmodel = {
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
        productPath: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'product_path'
        },
    };

    const pdinst = sequelize.isDefined(pdname) ? sequelize.model(pdname)
        : sequelize.define(pdname, pdmodel, { ...modelOpt });

    return { pdname, pdmodel, pdinst };
};
