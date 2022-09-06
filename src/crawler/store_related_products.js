

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
// const models = sq.models;
// try {
//     sq.authenticate();
// } catch (err) {
//     throw err;
// }



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
    // for(let item of products)
    // {
    //     console.log(item)
    // }
} catch (err) {
    throw err;
}
// return entries;



try {
    // let lastPID = 1
    // let total_entries = []
    // for (let file of dataList) {
    //     let relFile = dataDir + file;
    //     let entries = JSON.parse(readFileSync(relFile, 'utf8'));
    //     for (const i in entries.product) {
    //         const p = entries.product[i];
    //         if (p.image != null && p.title != null && p.link != null && p.price != null) {
    //             total_entries.push(
    //                 {
    //                     pid: lastPID,
    //                     name: p.title,
    //                     productIconUrl: p.image,
    //                     productUrl: p.link,
    //                     shopIconUrl: entries.imageurl,
    //                     scanHistory: 
    //                 }
    //             )
    //         }
    //     }
    //     total_entries.push(entries[0]);
    // }

    // let related_products = combine_products(total_entries)


    let res = await sq.transaction(async (t) => {
        // entries.pr = [];

        // for (const i in entries.product) {
        //     const p = entries.product[i];
        //     if (p.image != null && p.title != null && p.link != null && p.price != null) {
        //         /*

        //         // before save
        //         var mypics = ["pic1.jpg","pic2.jpg"]; profile.pictures = JSON.stringify( mypics ); profile.save()

        //         // after load before use
        //         var profile = Profile.get(1) pictures = JSON.parse(profile.pictures);

        //         

        /*try {
            console.log('Inserting related products');
            console.log('Shop: ' + s.name);
            await save_related_products(s, t);

        } catch (err) {
            console.error(err);
            process.exit(-2);
        }
        //}*/
    });

    // console.log(res);
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
