import scrapy
import json
from pbl.items import ShopCard

class SpideridealSpider(scrapy.Spider):
    name = 'spiderIdeal'
    allowed_domains = ['www.trobos.lt']
    start_urls = []
    for page in range(1,17):
        url=f'https://trobos.lt/prekes?vendor=ideal&page={page}'
        start_urls.append(url)
    item = []
    list = [{
        'sid': 15,
        'name': 'Samsung',
        'domain': 'https://www.ideal.lt/',
        'imageurl': 'https://content.trobos.lt/uploads/cache/odiseo_sylius_vendor_plugin_logo/6076a901d52a1120636483.png.webp',
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
        Image = 'https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-product-3.png'
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
        with open("spiderIdeal.json", "w") as final:
            json.dump(self.list, final, indent=2, ensure_ascii=False)