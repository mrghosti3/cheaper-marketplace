import 'dotenv/config';
import express from 'express';
import dataInstance from './data/index.js';

const { ENV, PORT, CORS, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW } = process.env;
const db = dataInstance(ENV, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW);

var app = express();
app.use(express.json());
app.listen(PORT,
    () => console.log(`LIVE: http://localhost:${PORT}/product`)
);

app.route('/product').get((req, res) => {
    const limit = 'limit' in req ? req.limit : 0;
    const page = 'page' in req ? req.page : 0;

    // NOTE: bad solution. Should look into ExpressJS middleware.
    res.setHeader('Access-Control-Allow-Origin', CORS);

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

app.route('/product/:id(\d+)').get((req, res) => {
    const { pid } = req.params;

    // NOTE: bad solution. Should look into ExpressJS middleware.
    res.setHeader('Access-Control-Allow-Origin', CORS);

    db.getProduct(pid).then(result => res.status(200).send(result));
});

app.route('/shop').get((req, res) => {
    const limit = 'limit' in req ? req.limit : 0;
    const page = 'page' in req ? req.page : 0;

    // NOTE: bad solution. Should look into ExpressJS middleware.
    res.setHeader('Access-Control-Allow-Origin', CORS);

    db.getShops(limit, page).then(result => res.status(200).send(result))
        .catch(e => {
            console.error(e.text);
            res.sendStatus(404);
        });
});

app.route('/shop/:id(\d+)').get((req, res) => {
    const { sid } = req.params;

    // NOTE: bad solution. Should look into ExpressJS middleware.
    res.setHeader('Access-Control-Allow-Origin', CORS);

    db.getShop(sid).then(result => res.status(200).send(result));
});

app.route('/tag').get((req, res) => {
    const limit = 'limit' in req ? req.limit : 0;
    const page = 'page' in req ? req.page : 0;

    // NOTE: bad solution. Should look into ExpressJS middleware.
    res.setHeader('Access-Control-Allow-Origin', CORS);

    db.getTags(limit, page).then(result => res.status(200).send(result))
        .catch(e => {
            console.error(e.text);
            res.sendStatus(404);
        });
});

app.route('/tag/:id(\d+)').get((req, res) => {
    const { tid } = req.params;

    // NOTE: bad solution. Should look into ExpressJS middleware.
    res.setHeader('Access-Control-Allow-Origin', CORS);

    db.getTag(tid).then(result => res.status(200).send(result));
});
