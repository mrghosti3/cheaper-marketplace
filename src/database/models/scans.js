import { pname } from "./product.js";

export const ppname = 'scans';

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
        lastScan: {
            type: DataTypes.TIME,
            primaryKey: true,
            field: 'last_scan'
        },
        price: DataTypes.DECIMAL,
    };

    const ppinst = sequelize.isDefined(ppname) ? sequelize.model(ppname)
        : sequelize.define(ppname, ppmodel, { ...modelOpt });

    return { ppname, ppmodel, ppinst };
}
