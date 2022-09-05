import { sname } from "./shop.js";
import { pname } from "./product.js";
import { scname } from "./scan.js";
import { cpname } from "./combined_prod.js";

export const prname = 'product_relations';

export const prcreate = (sequelize, DataTypes, modelOpt) => {
    const prmodel = {
        pid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'pid'
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'name'
        },
        productIconUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'image_url'
        },
        shops:{
            type: DataTypes.TEXT,
            field: 'shops'
        }
    };
const prinst = sequelize.isDefined(prname) ? sequelize.model(cprname)
    : sequelize.define(prname, prmodel, { ...modelOpt });

return { prname, prmodel, prinst };
}