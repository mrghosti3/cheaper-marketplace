export const sname = 'shop';

export const screate = (sequelize, DataTypes, modelOpt) => {
    const smodel = {
        sid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        url: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: 'http://www.domain.lt/product_image_path',
            field: 'domain'
        },
        shopIconUrl: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            defaultValue: 'http://www.domain.lt/product_image_path',
            field: 'image_url'
        }
    };

    const sinst = sequelize.isDefined(sname) ? sequelize.model(sname)
        : sequelize.define(sname, smodel, { ...modelOpt });

    return { sname, smodel, sinst };
};
