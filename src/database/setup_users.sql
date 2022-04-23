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

GRANT ALL ON cheaper.* TO
'medo'@'localhost', 'paulius'@'localhost', 'dovydas'@'localhost', 'roti7541'@'localhost',
'backend';
