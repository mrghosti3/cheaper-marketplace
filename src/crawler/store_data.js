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
    // 'output_Topo.json'
];

let lastID = 1;
for (const file of dataList) {
    const relFile = dataDir + file;

    let entries = JSON.parse(readFileSync(relFile, 'utf8'));
    entries.pdata = []
    for (const i in entries.products) {
        const p = entries.products[i];
        const pid = lastID++;
        entries.pdata.push({
            pid: pid,
            sid: entries.shop.sid,
            price: p.Price,
            product_path: p.Link
        });
        entries.products[i] = {
            pid: pid,
            name: p.Title,
            image_url: p.Image,
        };
    }

}
