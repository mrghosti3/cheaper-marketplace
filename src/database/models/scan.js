import { pname } from "./product.js";
export const scname = 'scan';

export const sccreate = (sequelize, DataTypes, modelOpt) => {
    const scmodel = {
        pid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: pname,
                key: 'pid',
            },
            field: 'pid'
        },
        lastScan: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'last_scan'
        },
        price: {
            type: DataTypes.DECIMAL,
            field: 'price'        
        }
    };

    const scinst = sequelize.isDefined(scname) ? sequelize.model(scname)
        : sequelize.define(scname, scmodel, { ...modelOpt });

    return { scname, scmodel, scinst };
}
