import { DataTypes } from 'sequelize';

export const tname = 'product';
export const tmodel = {
    pid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    productIconUrl: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        defaultValue: 'http://www.domain.lt/product_image_path',
        field: 'image_url'
    }
};
export default { tname, tmodel };
