-- Must be run as root in Database!!!
DROP DATABASE IF EXISTS cheaper;
CREATE DATABASE cheaper;

CREATE TABLE cheaper.product (
    pid        INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50) NOT NULL,
    image_url  VARCHAR(1024) NOT NULL DEFAULT 'http://www.domain.lt/product_image_path'
);

CREATE TABLE cheaper.shop (
    sid        INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50)   NOT NULL UNIQUE,
    domain     VARCHAR(1024) NOT NULL DEFAULT 'http://www.domain.lt',
    image_url  VARCHAR(1024) NOT NULL DEFAULT 'http://www.domain.lt/shop_image_path'
);

CREATE TABLE cheaper.pdata (
    pid          INT,
    sid          INT,
    last_scan    DATE NOT NULL DEFAULT CURRENT_DATE,
    price        DECIMAL(6, 2) UNSIGNED NOT NULL DEFAULT 1,
    product_path VARCHAR(1024) NOT NULL DEFAULT '/product_path',
    PRIMARY KEY(pid, sid, last_scan),
    FOREIGN KEY (pid) REFERENCES cheaper.product(pid),
    FOREIGN KEY (sid) REFERENCES cheaper.shop(sid)
);
