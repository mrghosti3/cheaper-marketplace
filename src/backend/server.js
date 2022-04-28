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
    db.getProducts(0, 0, limit, page).then(result => {
        res.status(200).send(result);
    }).catch(e => {
        console.log(e);
        res.sendStatus(404);
    });
});
// .post((req, res) => {
//     res.sendStatus(200);
// });

app.route('/product/:id(\d+)').get((req, res) => {
    res.status(200).send(db.getProduct());
});

app.route('/shop').get((req, res) => {
    res.status(200).send(db.getShops());
});

app.route('/shop/:id(\d+)').get((req, res) => {
    res.status(200).send(db.getShop());
});

app.route('/tag').get((req, res) => {
    res.status(200).send(db.getTags());
});

app.route('/tag/:id(\d+)').get((req, res) => {
    res.status(200).send(db.getTag());
});
