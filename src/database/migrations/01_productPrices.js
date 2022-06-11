import { ppname } from "../models/productPrices";

const productPricesView = {
    name: ppname,
    sql: [
        "SELECT pid, sid, name, domain, s.image_url AS shop_image_url,",
               "pd.last_scan AS last_scan, pd.price AS price,",
               "concat(s.domain, pd.product_path) AS product_url",
        "FROM pdata AS pd NATURAL JOIN shop AS s;"
    ].join(" ")
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
