import 'dotenv/config';
import express from 'express';
import dataInstance from './data/index.js';

const {
    NODE_ENV, PORT, CORS, SQLOGGING,
    DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW
} = process.env;

const db = dataInstance(NODE_ENV, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW, SQLOGGING);

const logError = (err) => {
    console.error({
        timestamp: new Date(Date.now()).toUTCString(),
        error: err
    });
};

var app = express();

app.use(express.json());

// Logs WEB query to STDOUT in JSON format.
app.use((req, _, next) => {
    req.timestamp = new Date(Date.now()).toUTCString();
    const info = {
        method: req.method,
        path: req.path,
        queries: req.query,
        timestamp: req.timestamp
    };

    console.log(JSON.stringify(info));

    next();
});

// Processes request queries and add header to response.
app.use((req, res, next) => {
    const { query } = req;
    req.query = {
        limit: 'limit' in query ? parseInt(query.limit) : 0,
        page: 'page' in query ? parseInt(query.page) : 0,
        tags: 't' in query ? query.t : "",
        greater: 'greater' in query ? parseInt(query.greater) : 0,
        lesser: 'lesser' in query ? parseInt(query.lesser): 0
    };

    // NOTE: do research for better implementations.
    res.setHeader('Access-Control-Allow-Origin', CORS);

    next();
});

app.listen(PORT,
    () => console.log(`LIVE ${NODE_ENV}: http://localhost:${PORT}/product`)
);

app.get('/products', (req, res) => {
    const { limit, page } = req.query;

    db.getProducts(0, 0, limit, page).then(result => {
        res.status(200).send(result)
    })
        .catch(e => {
            logError(e);
            res.sendStatus(404);
        });
});

app.get('/product/:pid(\\d+)', (req, res) => {
    const { pid, limit, page } = req.params;
    db.getProduct(pid).then(result => res.status(200).send(result))
        .catch(e => {
            logError(e);
            res.sendStatus(404);
        });
});

app.get('/search', (req, res) => {
    // NOTE: Include 'tags' processing (First for remote DB)
    const { tags, limit, page } = req.query;
    db.search(tags, 0, 0, page).then(result => res.status(200).send(result));
});
