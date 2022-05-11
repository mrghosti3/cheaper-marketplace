import scrapy
from pbl.items import PblSpider
import re

class SpiderasortiSpider(scrapy.Spider):
    name = 'spiderAsorti'
    allowed_domains = ['www.assorti.lt']
    start_urls = ['https://www.assorti.lt/katalogas/maistas/']


    def __init__(self):
        self.declare_xpath()

        #All the XPaths the spider needs to know go here
    def declare_xpath(self):
        self.getAllItemsXpath = '//*[@id="products_wrapper"]/div[2]/div/a/@href'
        self.TitleXpath  = '//*[@id="products_detailed"]/div[1]/div/div/div[2]/h1/text()'
        self.ImageXpath = '//*[@id="products_photos"]/div[1]/img/@src'
        self.PriceXpath = '//*[@id="products_add2cart"]/form/div/div[1]/div/div[1]/span/span[1]/text()'


    def parse(self, response):
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_item)
        
        #max_page = response.xpath('//*[@id="products_wrapper"]/div[3]/div[2]/ul/li[6]/a/text()').extract_first()

        # next_page = [response.url + '?page='+str(x)+'' for x in range(1, int(max_page))]
        # for page in next_page:
        #     url = page
        #     yield scrapy.Request(url, callback=self.parse)
        next_page = response.xpath('//*[@id="products_wrapper"]/div[3]/div[2]/ul/li/a[contains(@class, "pagination_link")]/@href').extract()
        if next_page[1] is not '#':
            print('-' * 70)
            print(next_page[1])
            print('-' * 70)
            url = response.urljoin(next_page[1])
            yield scrapy.Request(url, callback=self.parse)


    def parse_item(self, response):
        item = PblSpider()
 
        Title = response.xpath(self.TitleXpath).extract_first()
        Link = response.url
        Image = response.xpath(self.ImageXpath).extract_first()
        Price = response.xpath(self.PriceXpath).extract_first()


        #Put each element into its item attribute.
        item['Title']          = Title
        #item['Category']      = Category
        item['Price']          = Price.split(' ')[0]
        #item['Features']      = Features
        item['Image']          = Image
        item['Link']           = Link

        return item

