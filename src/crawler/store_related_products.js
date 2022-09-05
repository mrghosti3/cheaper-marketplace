

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

const { product_relations, combined_prod } = sq.models;

try {
    await sq.authenticate();
} catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(-1);
}

async function save_related_products(d, t) {
    const pr_save = product_relations.build({ pid: d.pid, name: d.title, prod_url: d.prod_url, image_url: d.image_url, shops: d.shops });
    await pr_save.save();
}

try {
    let products = await combined_prod.findAll();
    console.log(products)

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
    const options = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "title"
        ]
    };
    const fuse = new Fuse(data, options);
    for (const i in data.product) {
        const p = data.product[i];
        console.log(fuse.search(p.title))
    }
    return entries
}
