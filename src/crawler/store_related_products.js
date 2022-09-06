

import 'dotenv/config';
import { readFileSync } from 'fs';
import { Sequelize, DataTypes } from 'sequelize';
import { modelOpt, initModels } from 'database';
import Fuse from 'fuse.js'

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW } = process.env;

const sq = new Sequelize(
    `mariadb://${DB_USER}:${DB_PSSW}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false }
);

initModels(sq, DataTypes, modelOpt);

try {
    await sq.authenticate();
} catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(-1);
}

const { product_relations, combined_prod } = sq.models;

async function save_related_products(d, t) {
    const pr_save = product_relations.build({ pid: d.pid, name: d.title, prod_url: d.prod_url, image_url: d.image_url, shops: d.shops });
    await pr_save.save();
}

try {
    let products = await combined_prod.findAll();
    const cp = combine_products(products)
    console.log(cp)

} catch (err) {
    throw err;
}


try {
    let res = await sq.transaction(async (t) => {
       //callina funkcija kuri issavina kombinuotus produktus
    });
    console.log("End");
    await sq.close();
    process.exit(0);
} catch (err) {
    console.error('Unable to execute queries: ' + err);
    process.exit(-2);
}

function combine_products(data) {
    let entries = []
    let shops = []
    const options = {
        includeScore: true,
        findAllMatches: false,
        location: 1,
        threshold: 0.1,
        distance: 100,
        keys: [
            "name"
        ]
    };
    const dataToJson = JSON.stringify(data);
    const dataToParse = JSON.parse(dataToJson)
    const fuse = new Fuse(dataToParse, options);
    for(let i in dataToParse){
        const dtp = dataToParse
        let result = fuse.search(dtp[i].name)
        for(let res of result){
            shops.push({
                name: res.item.name,
                productUrl: res.item.productUrl,
                shopIconUrl: res.item.shopIconUrl,
                priceHistory: res.item.priceHistory,
                scanHistory: res.item.scanHistory
            })
        }
        entries.push({
            pid: dtp[i].pid,		
            name: dtp[i].name,
            productUrl: dtp[i].productUrl,
            productIconUrl: dtp[i].productIconUrl,
            shops: shops
        })
    }

    //TODO: Paieška turi būt rekursyvi. Jei iš 10 produktų pirmam matchai yra 2 ir 4,
    //      tai po visko 1, 2, 4 produktai yra pašalinami iš listo ir listas sukamas iš naujo kol lieka tik vienas arba 0 produktų
    
    return entries
}

function parseProduct(product, data){
    for(let item in product)
        data.filter(prod => prod.name != item.name)
}
