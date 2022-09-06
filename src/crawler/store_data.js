import 'dotenv/config';
import { readFileSync } from 'fs';
import { Sequelize, DataTypes } from 'sequelize';
import { modelOpt, initModels } from 'database';
import * as fs from 'fs';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW } = process.env;
const dataDir = 'data/';
let dataList = [];
fs.readdir(dataDir, (err, files) => {
    files.forEach(file => {
        dataList.push(file);
    });
});

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
    try {
        const shop_save = shop.build({ sid: d.sid, name: d.name, domain: d.domain, imageUrl: d.image_url });
        await shop_save.save();
    } catch {
        try {
            const shop_update = shop.upsert({ sid: d.sid, name: d.name, domain: d.domain, imageUrl: d.image_url })
            await shop_update.save()
        } catch (error) {
            console.error('Error updating `Shop` table:', error);
            process.exit(-1);
        }
    }
}
async function save_product(d, sid, t) {
    try {
        const product_save = product.build({ pid: d.pid, sid: sid, name: d.name, prodUrl: d.prod_url, imageUrl: d.image_url });
        await product_save.save();
    } catch {
        try {
            const product_update = product.upsert({ pid: d.pid, sid: sid, name: d.name, prodUrl: d.prod_url, imageUrl: d.image_url })
            await product_update.save()
        } catch (error) {
            console.error('Error updating `Product` table:', error);
            process.exit(-1);
        }
    }
}
async function save_scan(d, t) {
    try {
        const scan_save = scan.build({ pid: d.pid, price: d.price });
        await scan_save.save();
    } catch {
        try {
            const scan_update = scan.upsert({ pid: d.pid, price: d.price })
            await scan_update.save()
        } catch (error) {
            console.error('Error updating `Scan` table:', error);
            process.exit(-1);
        }
    }
}


try {
    let lastPID = 1;
    let res = await sq.transaction(async (t) => {
        for (let file of dataList) {
            let relFile = dataDir + file;

            let entries = JSON.parse(readFileSync(relFile, 'utf8'));

            entries = entries[0];

            entries.pdata = [];
            entries.scans = [];

            for (const i in entries.product) {
                const p = entries.product[i];
                if (p.image != null && p.title != null && p.link != null && p.price != null) {
                    entries.pdata.push({
                        pid: lastPID,
                        sid: entries.sid,
                        name: p.title,
                        prod_url: p.link,
                        image_url: p.image
                    });
                    entries.scans.push({
                        pid: lastPID,
                        price: p.price
                    });
                    lastPID++;
                }
            }

            try {
                console.log('Inserting shop');
                let s = {
                    sid: entries.sid,
                    name: entries.name,
                    domain: entries.domain,
                    image_url: entries.imageurl
                };
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
                    await save_scan(sc, t);
                }
            } catch (err) {
                console.error(err);
                process.exit(-2);
            }
        }
    });

    console.log("End");
    await sq.close();
    process.exit(0);
} catch (err) {
    console.error('Unable to execute queries: ' + err);
    process.exit(-2);
}
