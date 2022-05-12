import 'dotenv/config';
import { readFileSync } from 'fs';
import { createConnection } from 'mariadb';

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

const conn = await createConnection({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PSSW
});

await conn.beginTransaction();
let lastID = 1;
for (const file of dataList) {
    const relFile = dataDir + file;

    let entries = JSON.parse(readFileSync(relFile, 'utf8'));
    entries.pdata = []
    for (const i in entries.products) {
        const p = entries.products[i];
        const price = typeof p.Price == 'number' ? p.Price : parseFloat(p.Price.replaceAll('€', ''));
        const pid = lastID++;
        entries.pdata.push({
            pid: pid,
            sid: entries.shop.sid,
            price: price, //.replace(',', '.')
            product_path: p.Link
        });
        entries.products[i] = {
            pid: pid,
            name: p.Title,
            image_url: p.Image,
        };
    }

    try {
        await conn.query({
            namedPlaceholders: true,
            sql: 'INSERT INTO cheaper.shop(sid, name, domain, image_url) VALUES (:sid, :name, :domain, :image_url)'
        },entries.shop);

        await conn.batch({
            namedPlaceholders: true,
            sql: 'INSERT INTO cheaper.product(pid, name, image_url) VALUES (:pid, :name, :image_url)'
        }, entries.products);

        await conn.batch({
            namedPlaceholders: true,
            sql: 'INSERT INTO cheaper.pdata(pid, sid, price, product_path) VALUES (:pid, :sid, :price, :product_path)'
        }, entries.pdata);

    } catch (err) {
        console.error(err);
        process.exit(-2);
    }
}
await conn.commit();

await conn.end();
console.log("End");
process.exit(0);
