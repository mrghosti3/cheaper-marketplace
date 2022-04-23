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
