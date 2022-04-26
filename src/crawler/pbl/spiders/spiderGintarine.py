import scrapy
from bs4 import BeautifulSoup
import re
from pbl.items import PblSpider

class SpidergintarineSpider(scrapy.Spider):
    name = 'spiderGintarine'
    allowed_domains = ['www.gintarine.lt']
    start_urls = ['http://www.gintarine.lt/']

    def __init__(self):
        self.declare_xpath()

    def declare_xpath(self):
        self.getAllCategoriesXpath = '/html/body/div[1]/div[3]/div/header[2]/div/div[2]/div/nav[2]/div/ul/li/a/@href'
        self.getAllSubCategoriesXpath = '/html/body/div[1]/div[3]/div/main/div[3]/div/div/a/@href'
        self.getAllItemsXpath = '/html/body/div[1]/div[3]/div/div[2]/div/main/div[2]/div[2]/div[2]/div/form[1]/div/div/a/@href'
        self.TitleXpath  = '/html/body/div[1]/div[3]/div/div[3]/div/main/div[1]/div[1]/h1/text()'
        self.ImageXpath = '/html/body/div[1]/div[3]/div/div[3]/div/main/div[1]/div[2]/div/div/div[2]/div/div/div/div/img/@src'      
        self.PriceXpath = '/html/body/div[1]/div[3]/div/div[3]/div/main/div[2]/div/div[2]/form/div[1]/div/div[1]/text()'

    def parse(self, response):
        for href in response.xpath(self.getAllCategoriesXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_category, dont_filter=True)
 
    def parse_category(self,response):
        for href in response.xpath(self.getAllSubCategoriesXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_subcategory, dont_filter=True)

    def parse_subcategory(self,response):
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_main_item,dont_filter=True)
                        
    def parse_main_item(self,response):
            item = PblSpider()

            Title = response.xpath(self.TitleXpath).extract_first()
            Link = response.url
            Image = response.xpath(self.ImageXpath).extract_first()
            Price = response.xpath(self.PriceXpath).extract_first()

            item['Title']          = Title
            item['Price']          = Price
            item['Image']          = Image
            item['Link']           = Link

            return item
    