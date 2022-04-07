import http from 'http';

const paths = [
    '/product',
    '/shop'
];

paths.forEach(path => {
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
            let items = JSON.parse(chunk);
            items.forEach((el) => console.log(el));
            console.log();
        })
    });

    req.end()
});
