import 'dotenv/config';
import { createConnection } from 'mariadb';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW } = process.env;
const dataList = [
    'output_Barbora.json',
    'output_Elektro.json',
    'output_Moto.json',
    'output_Pigu.json',
    'output_Rimi.json',
    'output_Topo.json'
];

console.log({ DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PSSW });
console.log(dataList);
