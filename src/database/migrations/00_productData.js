import { modelOpt } from '../models/index.js';
import { pcreate } from '../models/product.js';
import { screate } from '../models/shop.js';

/**
 * This migrations purpose is to create table for pdata if it doesn't exist.
 */
export async function up({ context }) {
    const { queryInterface, sequelize, DataTypes } = context;

    const { pname, pmodel } = pcreate(sequelize, DataTypes, modelOpt);
    await queryInterface.createTable(pname, pmodel);

    const { sname, smodel } = screate(sequelize, DataTypes, modelOpt);
    await queryInterface.createTable(sname, smodel);
}

export async function down({ context }) {
    const { queryInterface, sequelize, DataTypes } = context;

    const { pname } = pcreate(sequelize, DataTypes, modelOpt);
    await queryInterface.dropTable(pname);

    const { sname } = screate(sequelize, DataTypes, modelOpt);
    await queryInterface.dropTable(sname);
}
