-- Must be run as root in Database!!!
DROP DATABASE IF EXISTS cheaper;
CREATE DATABASE cheaper;

CREATE TABLE cheaper.shop (
    sid        INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50)   NOT NULL UNIQUE,
    domain     VARCHAR(1024) NOT NULL UNIQUE DEFAULT 'http://www.domain.lt',
    image_url  VARCHAR(1024) NOT NULL DEFAULT 'http://www.domain.lt/shop_image_path'
);

CREATE TABLE cheaper.product (
    pid             INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    sid             INT UNSIGNED,
    name            VARCHAR(50) NOT NULL,
    prod_url        VARCHAR(1024) NOT NULL DEFAULT 'http://www.domain.lt/product_path',
    price           DECIMAL(6, 2) UNSIGNED NOT NULL DEFAULT 1,
    image_url       VARCHAR(1024) NOT NULL DEFAULT 'http://www.domain.lt/product_image_path',
    FOREIGN KEY(sid) REFERENCES cheaper.shop(sid)
);

CREATE TABLE cheaper.scans (
    pid         INT UNSIGNED,
    last_scan   DATE NOT NULL DEFAULT CURRENT_DATE,
    price       DECIMAL(6, 2) UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY(pid) REFERENCES cheaper.product(pid)
);
