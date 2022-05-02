-- Must be run as root in Database!!!
DROP DATABASE IF EXISTS cheaper;
CREATE DATABASE cheaper;

CREATE TABLE cheaper.product (
    pid        INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50) NOT NULL,
    image_url  VARCHAR(1024) NOT NULL DEFAULT 'http://www.domain.lt/product_image_path'
);

CREATE TABLE cheaper.shop (
    sid        INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50)   NOT NULL UNIQUE,
    domain     VARCHAR(1024) NOT NULL UNIQUE DEFAULT 'http://www.domain.lt',
    image_url  VARCHAR(1024) NOT NULL DEFAULT 'http://www.domain.lt/shop_image_path'
);

CREATE TABLE cheaper.tag (
    tid  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    term VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cheaper.pdata (
    pid          INT UNSIGNED,
    sid          INT UNSIGNED,
    last_scan    DATE NOT NULL DEFAULT CURRENT_DATE,
    price        DECIMAL(6, 2) UNSIGNED NOT NULL DEFAULT 1,
    product_path VARCHAR(1024) NOT NULL DEFAULT '/product_path',
    PRIMARY KEY(pid, sid, last_scan),
    FOREIGN KEY(pid) REFERENCES cheaper.product(pid),
    FOREIGN KEY(sid) REFERENCES cheaper.shop(sid)
);

CREATE TABLE cheaper.product_tags (
    tid INT UNSIGNED,
    pid INT UNSIGNED,
    PRIMARY KEY(tid, pid),
    FOREIGN KEY(tid) REFERENCES cheaper.tag(tid),
    FOREIGN KEY(pid) REFERENCES cheaper.product(pid)
);

CREATE TABLE cheaper.shop_tags (
    tid INT UNSIGNED,
    sid INT UNSIGNED,
    PRIMARY KEY(tid, sid),
    FOREIGN KEY(tid) REFERENCES cheaper.tag(tid),
    FOREIGN KEY(sid) REFERENCES cheaper.shop(sid)
);

CREATE VIEW cheaper.product_prices AS
SELECT pid, sid, s.name, domain, s.image_url AS shop_image_url,
       last_scan, price, Concat(domain, product_path) AS product_url

CREATE VIEW cheaper.combined_tags AS SELECT tid, pid, sid FROM cheaper.tag
LEFT JOIN cheaper.shop_tags USING (tid)
LEFT JOIN cheaper.product_tags USING (tid);
