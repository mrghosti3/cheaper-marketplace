import { cpname } from "../models/combined_prod.js";

const productView = {
    name: cpname,
    sql: "SELECT product.pid AS pid, product.name AS name, product.image_url AS productIconUrl, product.prod_url AS productUrl, shop.image_url AS shopIconUrl FROM product, shop WHERE product.sid=shop.sid;"
};

export async function up({ context }) {
    const { sequelize } = context;
    await sequelize.query(`CREATE VIEW ${productView.name} AS ${productView.sql}`, { raw: true, type: sequelize.QueryTypes.RAW });
}

export async function down({ context }) {
    const { queryInterface } = context;
    queryInterface.dropTable(productView.name);
}