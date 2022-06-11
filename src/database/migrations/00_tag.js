import { modelOpt } from '../models/index.js';
import { tcreate } from '../models/tag.js';
import { ptcreate, stcreate } from '../models/combinedTags.js';

/**
 * This migrations purpose is to create table for products if it doesn't exist.
 */
export async function up({ context }) {
    const { queryInterface, sequelize, DataTypes } = context;

    const { tname, tmodel } = tcreate(sequelize, DataTypes, modelOpt);
    await queryInterface.createTable(tname, tmodel);

    const { ptname, ptmodel } = ptcreate(sequelize, DataTypes, modelOpt);
    await queryInterface.createTable(ptname, ptmodel);

    const { stname, stmodel } = stcreate(sequelize, DataTypes, modelOpt);
    await queryInterface.createTable(stname, stmodel);
}

export async function down({ context }) {
    const { queryInterface, sequelize, DataTypes } = context;
    const { tname } = tcreate(sequelize, DataTypes, modelOpt);
    await queryInterface.dropTable(tname);

    const { ptname } = ptcreate(sequelize, DataTypes, modelOpt);
    await queryInterface.dropTable(ptname);

    const { stname } = stcreate(sequelize, DataTypes, modelOpt);
    await queryInterface.dropTable(stname);
}
