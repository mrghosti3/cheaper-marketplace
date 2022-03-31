# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from unicodedata import category
import scrapy

class PblSpider(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    Title =     scrapy.Field()
    Price =     scrapy.Field()
    sub_price = scrapy.Field()
    Image =     scrapy.Field()
    Link =      scrapy.Field()

    pass
