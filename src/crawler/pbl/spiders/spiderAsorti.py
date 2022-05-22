import scrapy
from pbl.items import PblSpider
from pbl.items import ShopCard
import json

class SpiderasortiSpider(scrapy.Spider):
    name = 'spiderAsorti'
    allowed_domains = ['www.assorti.lt']
    start_urls = ['https://www.assorti.lt/katalogas/maistas/']
    item = []
    list = [{
        'sid': 1,
        'name': 'Assorti',
        'domain': 'https://www.assorti.lt',
        'imageurl': 'https://www.assorti.lt/images/logo_white.png',
        'product': item
        }]

    def __init__(self):
        self.declare_xpath()

    def declare_xpath(self):
        self.getAllItemsXpath = '//*[@id="products_wrapper"]/div[2]/div/a/@href'
        self.TitleXpath  = '//*[@id="products_detailed"]/div[1]/div/div/div[2]/h1/text()'
        self.ImageXpath = '//*[@id="products_photos"]/div[1]/img/@src'
        self.PriceXpath = '//*[@id="products_add2cart"]/form/div/div[1]/div/div[1]/span/span[1]/text()'

    def parse(self, response):

        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_item)

        next_page = response.xpath('//*[@id="products_wrapper"]/div[3]/div[2]/ul/li/a[contains(@class, "pagination_link")]/@href').extract()
        if next_page[1] is not '#':
            print('-' * 70)
            print(next_page[1])
            print('-' * 70)
            url = response.urljoin(next_page[1])
            yield scrapy.Request(url, callback=self.parse)

    def parse_item(self, response):

            shop = ShopCard()

            Title = response.xpath(self.TitleXpath).extract_first()
            Link = response.url
            Image = response.xpath(self.ImageXpath).extract_first()
            Price = response.xpath(self.PriceXpath).extract_first()
            Price = Price.replace(',', '.')
            Price = float(Price.split(' ')[0])

            shop['item'] = {
                'title': Title,
                'link': Link,
                'image': Image,
                'price': Price
            }

            self.item.append(shop['item'])

    def closed(self, reason):
        with open("assorti.json", "w") as final:
            json.dump(self.list, final, indent=2, ensure_ascii=False)






