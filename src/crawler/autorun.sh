#!/bin/bash
for spider in $(scrapy list)
do
scrapy crawl "$spider"
done