import 'dotenv/config';
import http from 'http';
import { writeFileSync } from 'fs';

const { PORT } = process.env;

const paths = [
    { path: '/product?limit=20', file: '/product.json' },
    { path: '/product?limit=1', file: '/product_paged.json' },
    { path: '/product?limit=1&page=1', file: '/product_paged2.json' },
    { path: '/shop', file: '/shop.json' },
    { path: '/tag', file: '/tag.json' },
    { path: '/product/1', file: '/product1.json' },
    { path: '/shop/1', file: '/shop1.json' },
    { path: '/tag/1', file: '/tag1.json' }
];

for (let p of paths) {
    let options = {
        hostname: 'localhost',
        port: PORT,
        method: 'GET',
        path: p.path,
        headers: {
            Accept: 'application/json'
        }
    };

    let req = http.request(options, res => {
        res.setEncoding('utf8');

        console.log(`${p.path} Status: ${res.statusCode}`);
        if (res.statusCode === 404) return;

        res.on('data', (chunk) => {
            try {
                let items = JSON.parse(chunk);
                console.log(items);
                writeFileSync('test' + p.file, JSON.stringify(items, null, 2));
            } catch(e) {
                console.log("Bad response !!!");
                console.log(chunk);
            }
            console.log();
        })
    });

    req.end();
}
