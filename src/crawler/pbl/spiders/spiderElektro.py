import scrapy
from pbl.items import ShopCard
import json

class SpiderelektroSpider(scrapy.Spider):
    name = 'spiderElektro'
    allowed_domains = ['elektromarkt.lt']
    start_urls = ['https://elektromarkt.lt/']
    item = []
    list = [{
        'sid': 4,
        'name': 'Elektromarkt',
        'domain': 'https://elektromarkt.lt/',
        'imageurl': 'https://elektromarkt.lt/image/em_ukraine.png',
        'product': item
        }]

    def __init__(self):
        self.declare_xpath()

    def declare_xpath(self):
        self.getAllCategoriesXpath = '//*[@id="home-menu"]/div/div/ul/li/a/@href'
        self.getAllSubCategoriesXpath = '/html/body/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/a/@href'
        self.getAllSubSubCategoriesXpath = '/html/body/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/a/@href'
        self.getAllItemsXpath = '/html/body/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/a/@href'
        self.TitleXpath  = '/html/body/div[1]/div[2]/div[1]/div[6]/div[2]/div[2]/div/div[1]/div/div/div/div[1]/div/div/div/div[1]/h1/text()'
        self.ImageXpath = '/html/body/div[1]/div[2]/div[1]/div[6]/div[2]/div[2]/div/div[1]/div/div/div/div[1]/div/div/div/div[1]/div[1]/div[1]/div[2]/div/a/img/@src'   
        self.PriceXpath = '//*[@id="price-old"]/text()'

    def parse(self, response):
        for href in response.xpath(self.getAllCategoriesXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url=url,callback=self.parse_subcategory, dont_filter=True)
    
    def parse_subcategory(self, response):
        if response.xpath(self.getAllSubCategoriesXpath):
            for href in response.xpath(self.getAllSubCategoriesXpath):
                url = response.urljoin(href.extract())
                yield scrapy.Request(url=url,callback=self.parse_sub_subcategory, dont_filter=True)
        else: 
            self.parse_items

    def parse_sub_subcategory(self, response):
        if response.xpath(self.getAllSubSubCategoriesXpath):
            for href in response.xpath(self.getAllSubSubCategoriesXpath):
                url = response.urljoin(href.extract())
                yield scrapy.Request(url=url,callback=self.parse_items, dont_filter=True)
        else: 
            self.parse_items

    def parse_items(self,response):
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_main_item)
        
        next_page = [response.url + '?page='+str(x)+'' for x in range(1,40)]
        for page in next_page:
            url = page
            yield scrapy.Request(url, callback=self.parse)

    def parse_main_item(self,response):
        Title = response.xpath('//*[@id="pname"]/text()').extract_first()
        Link = response.url

        if response.xpath(self.ImageXpath).extract_first() is None:
            Image = 'https://elektromarkt.lt/image/em_ukraine.png'
        else:
            Image = response.xpath(self.ImageXpath).extract_first()

        if response.xpath(self.PriceXpath).extract_first() is None:
            Price = response.xpath('//*[@id="price-old"]/text()').extract_first()
        else:
            Price = response.xpath(self.PriceXpath).extract_first()

        Price = Price.replace(',', '.')
        Price = float(Price.split(' ')[0])

        shop = ShopCard()

        shop['item'] = {
                'title': Title,
                'link': Link,
                'image': Image,
                'price': Price
            }

        self.item.append(shop['item'])

    def closed(self, reason):
        with open("elektro.json", "w") as final:
            json.dump(self.list, final, indent=2, ensure_ascii=False)