import { modelOpt } from '../models/index.js';
import { screate } from '../models/shop.js';

/**
 * This migrations purpose is to create table for shops if it doesn't exist.
 */
export async function up({ context }) {
    const { queryInterface, sequelize, DataTypes } = context;
    const { sname, smodel } = screate(sequelize, DataTypes, modelOpt);
    await queryInterface.createTable(sname, smodel);
}

export async function down({ context }) {
    const { queryInterface } = context;
    await queryInterface.dropTable(tname);
}
