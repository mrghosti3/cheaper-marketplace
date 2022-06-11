import { modelOpt } from '../models/index.js';
import { pdcreate } from '../models/productData.js';

/**
 * This migrations purpose is to create table for pdata if it doesn't exist.
 */
export async function up({ context }) {
    const { queryInterface, sequelize, DataTypes } = context;
    const { pdname, pdmodel } = pdcreate(sequelize, DataTypes, modelOpt);
    await queryInterface.createTable(pdname, pdmodel);
}

export async function down({ context }) {
    const { queryInterface } = context;
    await queryInterface.dropTable(tname);
}
