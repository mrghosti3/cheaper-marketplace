import scrapy
import json
from pbl.items import ShopCard

class SpidersamsungSpider(scrapy.Spider):
    name = 'spiderSamsung'
    allowed_domains = ['www.trobos.lt']
    start_urls = []
    for page in range(1,5):
        url=f'https://trobos.lt/prekes?vendor=samsung&page={page}'
        start_urls.append(url)
    item = []
    list = [{
        'sid': 13,
        'name': 'Samsung',
        'domain': 'https://www.samsung.com/lt/',
        'imageurl': 'https://content.trobos.lt/uploads/cache/odiseo_sylius_vendor_plugin_logo/6110b99ea3bdb837831242.png.webp',
        'product': item
        }]

    def __init__(self):
        self.declare_xpath()

    def declare_xpath(self):
        self.getAllItemsXpath =  '//*[@id="category"]/div/div[1]/div/div[3]/div[4]/div/div/div/div/div/a/@href'
        self.TitleXpath  = '//*[@id="product"]/section[1]/div[3]/section/div[2]/h1/text()'    
        self.PriceXpath = '//*[@id="product"]/section[1]/div[3]/section/div[2]/div[1]/div/div[1]/div/div[1]/span/text()'

    def parse(self, response):
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url=url,callback=self.parse_main_item, dont_filter=True)
     
    def parse_main_item(self,response): 
        shop = ShopCard()
        Title = response.xpath(self.TitleXpath).extract_first()
        Link = response.url
        Image = 'https://content.trobos.lt/uploads/cache/odiseo_sylius_vendor_plugin_logo/6110b99ea3bdb837831242.png.webp'
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
        with open("spiderSamsung.json", "w") as final:
            json.dump(self.list, final, indent=2, ensure_ascii=False)