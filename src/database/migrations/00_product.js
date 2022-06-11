import { modelOpt } from '../models/index.js';
import { pcreate } from '../models/product.js';

/**
 * This migrations purpose is to create table for products if it doesn't exist.
 */
export async function up({ context }) {
    const { queryInterface, sequelize, DataTypes } = context;
    const { pname, pmodel } = pcreate(sequelize, DataTypes, modelOpt);
    await queryInterface.createTable(pname, pmodel);
}

export async function down({ context }) {
    const { queryInterface } = context;
    await queryInterface.dropTable(tname);
}
