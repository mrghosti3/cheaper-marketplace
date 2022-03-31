import 'dotenv/config';
import { createPool } from 'mariadb';
import express from 'express';
import productRouter from './routes/products.js';

const { PORT } = process.env;

var app = express();
app.listen(PORT,
    () => console.log(`LIVE: http://localhost:${PORT}/product`)
);

app.use('/product', productRouter);
