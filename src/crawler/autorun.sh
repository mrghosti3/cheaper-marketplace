#!/bin/bash
cd /crawler

for spider in $(scrapy list)
do
scrapy crawl "$spider"
done

cd
