export const tname = 'tag';

export const tcreate = (sequelize, DataTypes, modelOpt) => {
    const tmodel = {
        tid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        term: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    };

    const tinst = sequelize.isDefined(tname) ? sequelize.model(tname)
        : sequelize.define(tname, tmodel, { ...modelOpt });

    return { tname, tmodel, tinst };
};
