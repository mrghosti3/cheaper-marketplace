import { DataTypes } from "sequelize";

export const tname = 'shop';
export const tmodel = {
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

export default { tname, tmodel };
