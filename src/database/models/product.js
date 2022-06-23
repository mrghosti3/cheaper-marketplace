export const pname = 'product';

export const pcreate = (sequelize, DataTypes, modelOpt) => {
    const pmodel = {
        pid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: sname,
                key: 'sid',
            }
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        productPath: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'prod_url'
        },
        productIconUrl: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: 'http://www.domain.lt/product_image_path',
            field: 'image_url'
        }
    };

    const pinst = sequelize.isDefined(pname) ? sequelize.model(pname)
        : sequelize.define(pname, pmodel, { ...modelOpt });

    return { pname, pmodel, pinst };
};