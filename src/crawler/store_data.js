import { Console } from 'console';
import 'dotenv/config';
import { readFileSync } from 'fs';
import { Sequelize, DataTypes } from 'sequelize';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW } = process.env;
const dataDir = 'data/';
const dataList = [
    'spiderAsorti.json',
    'spiderAvitela.json',
    'spiderBarbora.json',
    'spiderElektro.json',
    'spiderErmitazas.json',
    'spiderEuro.json',
    'spiderGintarine.json',
    'spiderIdeal.json',
    'spiderMaxima.json',
    'spiderMile.json',
    'spiderMoto.json',
    'spiderPigu.json',
    'spiderRimi.json',
    'spiderSamsung.json',
    'spiderTopo.json'
];

const sq = new Sequelize(`mariadb://${DB_USER}:${DB_PSSW}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    //Disables action logging to console
    logging: false
});

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
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        defaultValue: 'http://www.domain.lt/product_image_path'
    }
}, modelOpt);

const pdata = sq.define('pdata', {
    pid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    last_scan: {
        type: DataTypes.DATE,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    product_path: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        defaultValue: 'http://www.domain.lt/product_path'
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
        allowNull: false
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

const tags = sq.define('tag', {
    tid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    term: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
}, modelOpt);

const shop_tags = sq.define('shop_tags', {
    tid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, modelOpt);

const product_tags = sq.define('product_tags', {
    tid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, modelOpt);

try {
    await sq.sync();
} catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(-1);
}

async function processOutput(relFile, t) {
    let entries = JSON.parse(readFileSync(relFile, 'utf8'));
    let lastPID = 1;

    entries.pdata = [];
    entries.tags = [];

    for (const i in entries.products) {
        const p = entries.products[i];
        const price = typeof p.Price == 'number' ? p.Price : parseFloat(p.Price.replaceAll('€', ''));
        const pid = lastPID++;
        entries.pdata.push({
            pid: pid,
            sid: entries.shop.sid,
            price: price, //.replace(',', '.')
            product_path: p.Link,
            last_scan: '2022-06-6'
        });
        entries.products[i] = {
            pid: pid,
            name: p.Title,
            image_url: p.Image,
            tags: p.Title.split(" ")
        };
        // Kiekvienam produktui sugeneruojam ID (kiekvienas produktas turi savo tagu lista)
        // Kai insertinsi produkta, bandai insertint taga.
        // Kai ivyksta insert fail, gauni to tago id ir pagal tai atnaujini product tag lentele (priskiri pid prie tid)
        let tag_list = p.Title.split(" ");
        for (const j in tag_list) {
            tag_list[j] = tag_list[j].replace(/[^a-zA-Z ]/g, "");
        }
        entries.tags.push(tag_list);
    }


    try {
        console.log('Inserting shop');
        let s = entries.shop
        const shop = shops.build({ sid: s.sid, name: s.name, domain: s.domain, image_url: s.image_url })
        await shop.save()

        console.log('Inserting pdata');
        for (const i in entries.pdata) {
            const p = entries.pdata[i];
            const pdata_save = pdata.build({ pid: p.pid, sid: p.sid, last_scan: p.last_scan, price: p.price, product_path: p.product_path })
            await pdata_save.save();
        }

        console.log('Inserting products');
        for (const i in entries.products) {
            const p = entries.products[i];
            const product = products.build({ pid: p.pid, name: p.name, image_url: p.image_url })
            await product.save()
        }

        console.log('Inserting tags');
        for (const i in entries.tags) {
            const p = entries.tags[i];
            for (const j in p) {
                const product = tags.build({ term: p[j] })
                try {
                    await product.save()
                }
                catch (err) {
                    console.error(err);
                }
            }
        }

        console.log('Assigning tid to pid and sid');
        for (const i in entries.products) {
            const p = entries.products[i];
            const tag = entries.tags[i];
            for (const j in tag) {
                const tag_ = await tags.findOne({ where: { term: tag[j] } });
                const p_tag = product_tags.build({ pid: p.pid, tid: tag_.tid })
                const shop_sid = entries.pdata[i].sid;
                const s_tag = shop_tags.build({ sid: shop_sid, tid: tag_.tid })
                await p_tag.save()
                await s_tag.save()
            }
        }
    } catch (err) {
        console.error(err);
        process.exit(-2);
    }
}

try {
    let res = await sq.transaction(async (t) => {
        for (let file of dataList) {
            let relFile = dataDir + file;
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
