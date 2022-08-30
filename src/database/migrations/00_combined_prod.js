import { cpname } from "../models/productPrices.js";

const productPricesView = {
    name: cpname,
    sql: "SELECT product.pid AS pid, product.name AS name, product.image_url AS productIconUrl, product.sid AS sid, product.prod_url AS productUrl, shop.image_url AS shopIconUrl, scan.last_scan AS scanHistory, scan.price AS priceHistory FROM product, shop, scan WHERE product.sid=shop.sid AND product.pid=scan.pid;"
};

export async function up({ context }) {
    const { sequelize } = context;
    console.log(productPricesView.sql);
    await sequelize.query(`CREATE VIEW ${productPricesView.name} AS ${productPricesView.sql}`, { raw: true, type: sequelize.QueryTypes.RAW });
}

export async function down({ context }) {
    const { queryInterface } = context;
    queryInterface.dropTable(productPricesView.name);
}