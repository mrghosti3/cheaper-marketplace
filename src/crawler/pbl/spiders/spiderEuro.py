import scrapy
from pbl.items import PblSpider
import re

''' 
ID OF THE SPIDER = 5 
'''

class SpidergintarineSpider(scrapy.Spider):
    name = 'spiderEuro'
    allowed_domains = ['www.eurovaistine.lt']
    start_urls = ['http://www.eurovaistine.lt/']

    def __init__(self):
        self.declare_xpath()

    def declare_xpath(self):
        self.getAllCategoriesXpath = '/html/body/div[2]/div/nav/div/span/a/@href'
        self.getAllItemsXpath = '/html/body/div[4]/div[1]/div[2]/div[5]/div/div/div/a/@href'
        self.TitleXpath  = '/html/body/div[3]/div/div[1]/div/div/div[1]/div[2]/h1/text()'
        self.ImageXpath = '/html/body/div/div/div/div/div/div/div/div/div/div/div/img/@data-src'
        self.PriceXpath = '/html/body/div[3]/div/div[1]/div/div/div[1]/div[2]/div[9]/div/div[1]/form/div[1]/text()'


    def parse(self, response):
        for href in response.xpath(self.getAllCategoriesXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_category)
 
    def parse_category(self,response):
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_main_item)

        next_page = [response.url + '?lm=1&page='+str(x)+'' for x in range(1,40)]
        for page in next_page:
            url = page
            yield scrapy.Request(url, callback=self.parse)

    def parse_main_item(self,response):
            item = PblSpider()

            Title = response.xpath(self.TitleXpath).extract_first()
            Link = response.url


            if response.xpath(self.ImageXpath).extract_first() is None:
                self.ImageXpath =  '/html/body/div/div/div/div/div/div/div/div/div/img/@data-src'
            else:  
                Image = response.xpath(self.ImageXpath).extract_first()

            Price = response.xpath(self.PriceXpath).extract_first()
            Price = self.clean(Price)
            l = Price.split(' ', 1)

            item['Title']          = Title
            item['Price']          = l[0]
            item['Image']          = Image
            item['Link']           = Link

            return item

    def clean(self, to_clean):
        if isinstance(to_clean, str):
            return re.sub('\s+', ' ', to_clean).strip()
        
        return [re.sub('\s+', ' ', d).strip()
                    for d in to_clean if d.strip()]