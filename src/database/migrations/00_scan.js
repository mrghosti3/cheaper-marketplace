import { modelOpt } from '../models/index.js';
import { sccreate } from '../models/scan.js';

/**
 * This migrations purpose is to create table for products if it doesn't exist.
 */
export async function up({ context }) {
    const { queryInterface, sequelize, DataTypes } = context;

    const { scname, scmodel } = sccreate(sequelize, DataTypes, modelOpt);
    await queryInterface.createTable(scname, scmodel);
}

export async function down({ context }) {
    const { queryInterface, sequelize, DataTypes } = context;
    const { scname } = sccreate(sequelize, DataTypes, modelOpt);
    await queryInterface.dropTable(scname);
}
