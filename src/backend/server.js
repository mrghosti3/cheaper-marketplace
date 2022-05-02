import 'dotenv/config';
import express from 'express';
import dataInstance from './data/index.js';

const { NODE_ENV, PORT, CORS, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW } = process.env;
const db = dataInstance(NODE_ENV, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW);

var app = express();
app.use(express.json());
app.use((req, res, next) => {
    const info = {
        method: req.method,
        path: req.path,
        queries: req.query,
        timestamp: new Date(Date.now()).toUTCString()
    };

    console.log(JSON.stringify(info));

    // NOTE: do research for better implementations.
    res.setHeader('Access-Control-Allow-Origin', CORS);

    next();
});
app.listen(PORT,
    () => console.log(`LIVE: http://localhost:${PORT}/product`)
);

app.route('/product').get((req, res) => {
    const query = req.query;
    const limit = 'limit' in query ? query.limit : 0;
    const page = 'page' in query ? query.page : 0;

    db.getProducts(0, 0, limit, page).then(result => res.status(200).send(result))
        .catch(e => {
            console.error(e.text);
            res.sendStatus(404);
        });
});
// NOTE: discuss how data is added to database!!!
// .post((req, res) => {
//     res.sendStatus(200);
// });

app.get('/product/:pid(\\d+)', (req, res) => {
    const { pid } = req.params;

    db.getProduct(pid).then(result => res.status(200).send(result))
        .catch(e => {
            console.error(e.text);
            res.sendStatus(404);
        });
});

app.get('/shop', (req, res) => {
    const query = req.query;
    const limit = 'limit' in query ? query.limit : 0;
    const page = 'page' in query ? query.page : 0;

    db.getShops(limit, page).then(result => res.status(200).send(result))
        .catch(e => {
            console.error(e.text);
            res.sendStatus(404);
        });
});

app.get('/shop/:sid(\\d+)', (req, res) => {
    const { sid } = req.params;

    db.getShop(sid).then(result => res.status(200).send(result))
        .catch(e => {
            console.error(e.text);
            res.sendStatus(404);
        });
});

app.get('/tag', (req, res) => {
    const query = req.query;
    const limit = 'limit' in query ? query.limit : 0;
    const page = 'page' in query ? query.page : 0;

    db.getTags(limit, page).then(result => res.status(200).send(result))
        .catch(e => {
            console.error(e.text);
            res.sendStatus(404);
        });
});

app.get('/tag/:tid(\\d+)', (req, res) => {
    const { tid } = req.params;

    db.getTag(tid).then(result => res.status(200).send(result))
        .catch(e => {
            console.error(e.text);
            res.sendStatus(404);
        });
});

app.get('/search', (req, res) => {
    const query = req.query;
    const limit = 'limit' in query ? query.limit : 0;
    const page = 'page' in query ? query.page : 0;
    const tags = 'tags' in query ? query.tags : 0;

    db.getProducts(0, 0, limit, page).then(result => res.status(200).send(result));
});
