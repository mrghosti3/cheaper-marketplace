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

| Option  |                              Usage                            |
|---------|---------------------------------------------------------------|
| DB_HOST | host domain/ip address where DB is located (can be localhost) |
| DB_PORT | open port to DB service communication (default: 3306)         |
| DB_NAME | Created database name                                         |
| DB_USR  | Username to access the database                               |
| DB_PSW  | Password to access assigned user                              |
