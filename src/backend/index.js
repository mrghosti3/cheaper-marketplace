require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USR;
const dbPass = process.env.DB_PSW;

console.log({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPass
});
