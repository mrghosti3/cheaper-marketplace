import scrapy
from pbl.items import ShopCard
import json

''' 
ID OF THE SPIDER = 8
'''

class SpidermotoSpider(scrapy.Spider):
    name = 'spiderMoto'
    allowed_domains = ['www.motomoto.lt']
    start_urls = ['http://www.motomoto.lt/']
    base_url = 'http://www.motomoto.lt'
    item = []
    list = [{
        'sid': 8,
        'name': 'MotoMoto',
        'domain': 'hhttps://www.motomoto.lt/',
        'imageurl': 'https://www.motomoto.lt/index_files/images/motomoto-logo.png',
        'product': item
        }]

    def __init__(self):
        self.declare_xpath()

    def declare_xpath(self):
        self.getAllCategoriesXpath = '//*[@id="content"]/nav/ul/li/div/a/@href'
        self.getAllSubCategoriesXpath = '//*[@id="content"]/nav/ul/li/div/a/@href'
        self.getAllItemsXpath = '/html/body/main/section/div[2]/div/div/section/section/section/section/div[2]/div/div/div/div/div/div/div/a/@href'
        self.TitleXpath  = '//*[@id="main"]/div[1]/div[2]/h1/text()'
        self.ImageXpath = '//*[@id="content"]/div/div[1]/a/img/@src'      
        self.PriceXpath = '//*[@id="main"]/div[1]/div[2]/div[2]/div[2]/div/span/text()'

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
            
        next_page = response.xpath('/html/body/main/section/div[2]/div/div/section/section/section/section/div[2]/nav/div[2]/ul/li[9]/a').extract_first()
        if next_page is not None:
            url = response.urljoin(next_page)
            yield scrapy.Request(url, callback=self.parse_category, dont_filter=True)
            
    def parse_main_item(self,response):
        Title = response.xpath(self.TitleXpath).extract_first()
        Link = response.url
        Image = self.base_url + response.xpath(self.ImageXpath).extract_first()
        Price = response.xpath(self.PriceXpath).extract_first()
        Price = Price.replace(',', '.')
        Price = float(Price.split(' ')[1])
        shop = ShopCard()

        shop['item'] = {
                'title': Title,
                'link': Link,
                'image': Image,
                'price': Price
            }

        self.item.append(shop['item'])

    def closed(self, reason):
        with open("moto.json", "w") as final:
            json.dump(self.list, final, indent=2, ensure_ascii=False)
    