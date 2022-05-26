import { DataTypes } from 'sequelize';

export default {
    pid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    sid: {
        type: DataTypes.INTEGER,
        primaryKey: true
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
        field: 'shop_image_url'
    },
    productUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'product_url'
    },
    lastScan: {
        type: DataTypes.TIME,
        primaryKey: true,
        field: 'last_scan'
    },
    price: {
        type: DataTypes.DECIMAL
    }
};