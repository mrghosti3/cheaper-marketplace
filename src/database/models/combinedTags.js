import { pname } from "./product.js";
import { sname } from "./shop.js";
import { tname } from "./tag.js";

export const ptname = 'product_tags';

export const ptcreate = (sequelize, DataTypes, modelOpt) => {
    const ptmodel = {
        tid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: tname,
                key: 'tid',
            }
        },
        pid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: pname,
                key: 'pid',
            }
        }
    };

    const ptinst = sequelize.isDefined(ptname) ? sequelize.model(ptname)
        : sequelize.define(ptname, ptmodel, { ...modelOpt });

    sequelize.model(tname).belongsToMany(sequelize.model(pname), {
        through: ptinst,
        as: 'products',
        foreignKey: {
            name: 'tid',
            allowNull: false
        },
        otherKey: {
            name: 'pid',
            allowNull: false
        }
    });

    return { ptname, ptmodel, ptinst };
};

export const stname = 'shop_tags';

export const stcreate = (sequelize, DataTypes, modelOpt) => {
    const stmodel = {
        tid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: tname,
                key: 'tid',
            }
        },
        sid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: sname,
                key: 'sid',
            }
        }
    };

    const stinst = sequelize.isDefined(stname) ? sequelize.model(stname)
        : sequelize.define(stname, stmodel, { ...modelOpt });

    sequelize.model(tname).belongsToMany(sequelize.model(sname), {
        through: stinst,
        as: 'shops',
        foreignKey: {
            name: 'tid',
            allowNull: false
        },
        otherKey: {
            name: 'sid',
            allowNull: false
        }
    });

    return { stname, stmodel, stinst };
};
