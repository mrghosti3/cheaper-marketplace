import { DataTypes } from 'sequelize';

export const tname = 'pdata';
export const tmodel = {
    pid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    sid: {
        type: DataTypes.INTEGER,
        primaryKey: true
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

export default { tname, tmodel };
