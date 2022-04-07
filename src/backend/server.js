import 'dotenv/config';
import express from 'express';
import Data from './data.js';

console.log(typeof Data);
const { PORT } = process.env;
const db = Data();
console.log(typeof db);

var app = express();
app.use(express.json());
app.listen(PORT,
    () => console.log(`LIVE: http://localhost:${PORT}/product`)
);

app.route('/product')
.get((req, res) => {
    const reqData = db.getProducts();
    res.status(200).send(reqData);
}).post((req, res) => {
    res.sendStatus(200);
});
