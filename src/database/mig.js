/*
 * !!! Do not import this !!!
 *
 * Authors: Team Cheaper
*/

import 'dotenv/config';
import { Sequelize, DataTypes } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW } = process.env;

const sequelize = new Sequelize(
    `mariadb://${DB_USER}:${DB_PSSW}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false }
);

const migContext = {
    queryInterface: sequelize.getQueryInterface(),
    sequelize, DataTypes
}

const storage = new SequelizeStorage({ sequelize });

const umzug = new Umzug({
    migrations: {
        glob: ['migrations/*.js'],
        resolve: params => {
            const getModule = () => import(`file:///${params.path.replace(/\\/g, '/')}`)
            return {
                name: params.name,
                path: params.path,
                up: async upParams => (await getModule()).up(upParams),
                down: async downParams => (await getModule()).down(downParams),
            };
        }
    },
    context: migContext,
    storage: storage,
    logger: console
});

umzug.runAsCLI();
