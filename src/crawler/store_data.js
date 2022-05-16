import 'dotenv/config';
import { readFileSync } from 'fs';
import { Sequelize, DataTypes } from 'sequelize';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW } = process.env;
const dataDir = 'data/';
const dataList = [
    'output_Barbora.json',
    // 'output_Elektro.json',
    // 'output_Moto.json',
    // 'output_Pigu.json',
    // 'output_Rimi.json',
    'output_Topo.json'
];

const sq = new Sequelize(`mariadb://${DB_USER}:${DB_PSSW}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

const modelOpt = {
    timestamps: false,
    freezeTableName: true
}

const products = sq.define('product', {
    pid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    image_url: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        defaultValue: 'http://www.domain.lt/product_image_path'
    }
}, modelOpt);

const shops = sq.define('shop', {
    sid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    domain: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        defaultValue: 'http://www.domain.lt/product_image_path'
    },
    image_url: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        defaultValue: 'http://www.domain.lt/product_image_path'
    }
}, modelOpt);

try {
    await sq.sync();
} catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(-1);
}

const processOutput = (relFile, transaction) => {
    let entries = JSON.parse(readFileSync(relFile, 'utf8'));
    let lastPID = 1;

    entries.pdata = [];
//     entries.tags = {};

    // TODO: reimplement with Sequelize
    for (const i in entries.products) {
        const p = entries.products[i];
        const price = typeof p.Price == 'number' ? p.Price : parseFloat(p.Price.replaceAll('€', ''));
//         const pid = lastPID++;
//         entries.pdata.push({
//             pid: pid,
//             sid: entries.shop.sid,
//             price: price, //.replace(',', '.')
//             product_path: p.Link
//         });
//         entries.products[i] = {
//             pid: pid,
//             name: p.Title,
//             image_url: p.Image,
//             tags: 
//         };

//         p.name.split(' ')
//             .forEach((tag) => entries.tags[tag] = { name: tag });
//     }

//     try {
//         let queryOpt = {
//             namedPlaceholders: true,
//             sql: 'INSERT INTO cheaper.shop(sid, name, domain, image_url) VALUES (:sid, :name, :domain, :image_url)'
//         }

//         console.log('Inserting shops');
//         await conn.query(queryOpt, entries.shop);

//         console.log('Inserting products');
//         queryOpt.sql = 'INSERT INTO cheaper.product(pid, name, image_url) VALUES (:pid, :name, :image_url)';
//         await conn.batch(queryOpt, entries.products);

//         console.log('Inserting pdata');
//         queryOpt.sql = 'INSERT INTO cheaper.pdata(pid, sid, price, product_path) VALUES (:pid, :sid, :price, :product_path)';
//         conn.batch(queryOpt, entries.pdata);

//         for (const prod in )
//     } catch (err) {
//         console.error(err);
//         process.exit(-2);
    }
}

try {
    const res = await sq.transaction(async (t) => {
        for (const file of dataList) {
            const relFile = dataDir + file;
            processOutput(relFile, t);
        }
    });
    console.log(res);
    console.log("End");
    await sq.close();
    process.exit(0);
} catch (err) {
    console.error('Unable to execute queries: ' + err);
    process.exit(-2);
}
