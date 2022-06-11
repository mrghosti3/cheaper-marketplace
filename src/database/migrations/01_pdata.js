import { tname, tmodel } from '../models/pdata.js';

/**
 * This migrations purpose is to create table for pdata if it doesn't exist.
 */
export async function up({ context }) {
    const { queryInterface } = context;
    await queryInterface.createTable(tname, tmodel);
}

export async function down({ context }) {
    const { queryInterface } = context;
    await queryInterface.dropTable(tname);
}
