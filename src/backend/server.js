import 'dotenv/config';
import express from 'express';
import Data from './data.js';

const { PORT, CORS } = process.env;
const db = Data();

var app = express();
app.use(express.json());
app.listen(PORT,
    () => console.log(`LIVE: http://localhost:${PORT}/product`)
);

app.route('/product').get((req, res) => {
    // NOTE: bad solution. Should look into ExpressJS middleware.
    res.setHeader('Access-Control-Allow-Origin', CORS);
    res.status(200).send(db.getProducts());
});
// .post((req, res) => {
//     res.sendStatus(200);
// });

app.route('/product/:id(\d+)').get((req, res) => {
    res.status(200).send(db.getProducts());
});

app.route('/shop').get((req, res) => {
    res.status(200).send(db.getShops());
});

app.route('/shop/:id(\d+)').get((req, res) => {
    res.status(200).send(db.getShops());
});

app.route('/tag').get((req, res) => {
    res.status(200).send(db.getTags());
});

app.route('/tag/:id(\d+)').get((req, res) => {
    res.status(200).send(db.getTags());
});
