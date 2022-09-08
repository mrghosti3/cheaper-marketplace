

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

const { product_relations, combined_prod, scan } = sq.models;

async function save_related_products(d, t) {
    try{
        const pr_save = product_relations.build({ pid: d.pid, name: d.name, productIconUrl: d.productIconUrl, shops: d.shops });
        await pr_save.save();
    } catch {
        try {
            await product_relations.upsert({ pid: d.pid, name: d.name, productIconUrl: d.productIconUrl, shops: d.shops })
        } catch (error) {
            console.error('Error updating `product_relations` table:', error);
            process.exit(-1);
        }
    }
}

try {
    let products = await combined_prod.findAll();
    let scans = await scan.findAll()

    // Convert to js array
    products = JSON.stringify(products);
    products = JSON.parse(products)
    scans = JSON.stringify(scans);
    scans = JSON.parse(scans)

    for(const p in products){
        console.log('Combining scans with products: ' + p + '/' + products.length)
        let scanHistory = []
        let priceHistory = []
        for(let item of scans){
            if(item.pid == products[p].pid){
                scanHistory.push(item.lastScan)
                priceHistory.push(item.price)
            }
        }
        products[p].scanHistory = scanHistory
        products[p].priceHistory = priceHistory
    }

    //callina funkcija kuri issavina kombinuotus produktus
    let res = await sq.transaction(async (t) => {
       
       for(const i in products){
        console.log('Combining products: ' + i + '/' + products.length)
        await save_related_products(combine_products(products, products[i]), t)
       }
    });
    console.log("End");
    await sq.close();
    process.exit(0);
} catch (err) {
    console.error('Unable to execute queries: ' + err);
    process.exit(-2);
}

function combine_products(data, product) {
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
    const fuse = new Fuse(data, options);

    let result = fuse.search(product.name)
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
        pid: product.pid,		
        name: product.name,
        productIconUrl: product.productIconUrl,
        shops: JSON.stringify(shops)
    })
    console.log(entries[0])
    return entries[0]
    

    //TODO: Paieška turi būt rekursyvi. Jei iš 10 produktų pirmam matchai yra 2 ir 4,
    //      tai po visko 1, 2, 4 produktai yra pašalinami iš listo ir listas sukamas iš naujo kol lieka tik vienas arba 0 produktų
    

    // NOTE: Nukerpa pavadinimus
}

// function parseProduct(product, data){ // panaikina duplikatus pagal pavadinimą
//     for(let item in product)
//         data.filter(prod => prod.name != item.name)
// }
