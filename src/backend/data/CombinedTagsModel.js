import { DataTypes } from 'sequelize';

export default {
    tid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    pid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    sid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
};
