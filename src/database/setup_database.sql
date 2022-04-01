-- Must be run as root in Database!!!

DROP USER IF EXISTS 'medo'@'localhost';
CREATE USER 'medo'@'localhost';

DROP USER IF EXISTS 'paulius'@'localhost';
CREATE USER 'paulius'@'localhost';

DROP USER IF EXISTS 'dovydas'@'localhost';
CREATE USER 'dovydas'@'localhost';

DROP USER IF EXISTS 'roti7541'@'localhost';
CREATE USER 'roti7541'@'localhost';

DROP USER IF EXISTS 'backend';
CREATE USER 'backend';

DROP DATABASE IF EXISTS cheaper;
CREATE DATABASE cheaper;

GRANT ALL ON cheaper.* TO 'medo'@'localhost', 'paulius'@'localhost', 'dovydas'@'localhost', 'roti7541'@'localhost', 'backend';

CREATE TABLE cheaper.product (
    pid        INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50) NOT NULL,
    image_path VARCHAR(1024) NOT NULL DEFAULT '/'
);

CREATE TABLE cheaper.shop (
    sid        INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50)   NOT NULL UNIQUE,
    domain     VARCHAR(1024) NOT NULL DEFAULT 'domain.lt',
    image_path VARCHAR(1024) NOT NULL DEFAULT '/'
);

CREATE TABLE cheaper.current_price (
    pid       INT,
    sid       INT,
    price     DECIMAL(6, 2) UNSIGNED NOT NULL DEFAULT 1,
    address   VARCHAR(1024) NOT NULL DEFAULT '/',
    last_scan DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY(pid, sid),
    FOREIGN KEY (pid) REFERENCES cheaper.product(pid),
    FOREIGN KEY (sid) REFERENCES cheaper.shop(sid)
);
