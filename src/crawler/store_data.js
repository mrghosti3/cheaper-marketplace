import 'dotenv/config';
import { readFileSync } from 'fs';
import { Sequelize, DataTypes } from 'sequelize';
import { modelOpt, initModels } from 'database';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW } = process.env;
const dataDir = 'data/';
const dataList = [
    // 'spiderAsorti.json',
    // 'spiderAvitela.json',
    'spiderBarbora.json'
    // 'spiderElektro.json',
    // 'spiderErmitazas.json',
    // 'spiderEuro.json',
    // 'spiderGintarine.json',
    // 'spiderIdeal.json',
    // 'spiderMaxima.json',
    // 'spiderMile.json',
    // 'spiderMoto.json',
    // 'spiderPigu.json',
    // 'spiderRimi.json',
    // 'spiderSamsung.json',
    // 'spiderTopo.json'
];

const sq = new Sequelize(
    `mariadb://${DB_USER}:${DB_PSSW}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false }
);

initModels(sq, DataTypes, modelOpt);

const { shop, product, scan } = sq.models;

try {
    await sq.authenticate();
} catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(-1);
}

async function save_shop(d, t) {
    console.log(d.domain);
    const shop_save = shop.build({ sid: d.sid, name: d.name, domain: d.domain, imageUrl: d.image_url });
    await shop_save.save();
}
async function save_product(d, sid, t) {
    const product_save = product.build({ pid: d.pid, sid: sid, name: d.name, prodUrl: d.prod_url, imageUrl: d.image_url });
    await product_save.save();
}
async function save_scan(d, t) {
    const scan_save = scan.build({ pid: d.pid, price: d.price });
    console.log(d);
    await scan_save.save();
}


try {
    let res = await sq.transaction(async (t) => {
        for (let file of dataList) {
            let relFile = dataDir + file;

            let entries = JSON.parse(readFileSync(relFile, 'utf8'));
            let lastPID = 1;
            entries.pdata = [];
            entries.scans = [];

            for (const i in entries.products) {
                const p = entries.products[i];
                const pid = lastPID++;

                entries.pdata.push({
                    pid: pid,
                    sid: entries.shop.sid,
                    name: p.Title,
                    prod_url: p.Link,
                    image_url: p.Image
                });
                entries.scans.push({
                    pid: pid,
                    price: parseFloat(p.Price.replace(',', '.'))
                });
            }

            try {
                console.log('Inserting shop');
                let s = entries.shop;
                console.log('Shop: ' + s.name);
                await save_shop(s, t);

                console.log('Inserting products');
                for (const i in entries.pdata) {
                    const p = entries.pdata[i];
                    console.log(i + '/' + entries.pdata.length);
                    await save_product(p, s.sid, t);
                }

                console.log('Inserting scans');
                for (const i in entries.scans) {
                    const sc = entries.scans[i];
                    console.log(i + '/' + entries.scans.length);
                    console.log(sc.price);
                    await save_scan(sc, t);
                }
            } catch (err) {
                console.error(err);
                process.exit(-2);
            }
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
