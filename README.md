# Cheaper marketplace

This is a Vilnius University (VU) Faculty of Mathematics and Informatics (MIF)
Informatics Technologies Problem Based Learning (PBL) course task.

__Practical task description__ for this repo: to create a website where user can look
up a current product price from various shops: Rimi, Iki, Maxima, Topo Centras and etc.

## Repo Structure

This repository is seperated in sections like: `src`, `doc`.

### src

This section (folder) is meant to store all the required source and is seperted in
several subprojects:

- `frontend`: Vue.js web app that displays collected information about product prices in
    different shops;
- `backend`: Custom backend implemented as REST API to abstract, standartize interfacing
    with the MariaDB database.
- `crawler`: Automated tool for collecting shops published prices of the products they
    are selling and storing them into MariaDB instance.
- `database`: This project is mainly for storing SQL scripts and documenting Database
    structure.

Each subproject should contain a README.md file for individual instruction for running
it or deploying the project on the production environment.

### doc

To be added...

## Authors

- [Robertas Timukas](https://git.mif.vu.lt/roti7541) (alias: [mrghosti3](https://github.com/mrghosti3)) robertas.timukas@mif.stud.vu.lt
- Paulius Mieščionaitis (alias: [shmitzas](https://github.com/shmitzas))
- Dovydas Juodkažis
- ahmetberkkoc
