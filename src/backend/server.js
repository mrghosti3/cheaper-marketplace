import 'dotenv/config';
import express from 'express';
import Data from './data.js';

const { PORT } = process.env;
const db = Data();

var app = express();
app.use(express.json());
app.listen(PORT,
    () => console.log(`LIVE: http://localhost:${PORT}/product`)
);

app.route('/product')
.get((req, res) => {
    res.status(200).send(db.getProducts());
}).post((req, res) => {
    res.sendStatus(200);
});

app.route('/shop')
.get((req, res) => {
    res.status(200).send(db.getShops());
});
