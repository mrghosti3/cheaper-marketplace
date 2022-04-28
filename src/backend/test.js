import http from 'http';
import { writeFileSync } from 'fs';

const paths = [
    '/product',
    '/shop',
    '/tag',
    '/product/1',
    '/shop/1',
    '/tag/1'
];

for (let path of paths) {
    let options = {
        hostname: 'localhost',
        port: 8080,
        method: 'GET',
        path: path,
        headers: {
            Accept: 'application/json'
        }
    };

    let req = http.request(options, res => {
        res.setEncoding('utf8');

        console.log(`${path} Status: ${res.statusCode}`);
        if (res.statusCode === 404) return;

        res.on('data', (chunk) => {
            try {
                let items = JSON.parse(chunk);
                console.log(items);
                writeFileSync('test' + path + '.json', JSON.stringify(items, null, 2));
            } catch(e) {
                console.log("Bad response !!!");
                console.log(chunk);
            }
            console.log();
        })
    });

    req.end();
}
