# BACK-END Service

## Requirements

- NodeJS
- NPM
- Linux + SystemD
- MariaDB/MySQL server

## Setup

1. Copy contents of `.env.example` file into `.env` file:

```shell
cp .env.example .env
```

2. Edit the `.env` file with info from your DB server:

| Option  |                              Usage                             |
|---------|----------------------------------------------------------------|
| ENV     | either 'dev' or 'prod' values. Dev will use built-in test data |
| PORT    | open backend server on specified port                          |
| CORS    | origin for Access-Control-Allow-Origin header field            |
| DB_HOST | host domain/ip address where DB is located (can be localhost)  |
| DB_PORT | open port to DB service communication (default: 3306)          |
| DB_NAME | Created database name                                          |
| DB_USR  | Username to access the database                                |
| DB_PSW  | Password to access assigned user                               |

3. Install dependencies:

```shell
# For prod
npm install --production

# For dev
npm install
```

4. Run the backend API:

```shell
# For prod
node server.js

# For dev
npm run dev
```

> NOTE: when running `dev` it will reload itself when you edit and save code.
