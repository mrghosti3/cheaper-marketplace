import re
import scrapy
from scrapy.shell import inspect_response
from pbl.items import PblSpider

class SpiderbarboraSpider(scrapy.Spider):
    name = 'spiderBarbora'
    allowed_domains = ['barbora.lt']
    start_urls = ['https://barbora.lt/darzoves-ir-vaisiai', 
                 'https://barbora.lt/pieno-gaminiai-ir-kiausiniai', 
                 'https://barbora.lt/duonos-gaminiai-ir-konditerija',
                 'https://barbora.lt/mesa-zuvys-ir-kulinarija',
                 'https://barbora.lt/bakaleja',
                 'https://barbora.lt/saldytas-maistas',
                 'https://barbora.lt/gerimai',
                 'https://barbora.lt/kudikiu-ir-vaiku-prekes',
                 'https://barbora.lt/kosmetika-ir-higiena',
                 'https://barbora.lt/svaros-ir-gyvunu-prekes',
                'https://barbora.lt/namai-ir-laisvalaikis']

    def __init__(self):
        self.declare_xpath()

        #All the XPaths the spider needs to know go here
    def declare_xpath(self):
        #self.getAllItemsXpath = '/html/body/div[1]/div/div[3]/div/div[3]/div[4]/div/div/div[1]/div[1]/a[2]/@href'
        self.getAllItemsXpath = '/html/body/div/div/div/div/div/div/div/div/div/div/a/@href'
        self.TitleXpath  = '/html/body/div[2]/div/div[3]/div/div[3]/div/div[1]/div[1]/div[2]/div[2]/h1/text()'
        self.ImageXpath = '/html/body/div[2]/div/div[3]/div/div[3]/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div[2]/div/img/@src'      
        self.PriceXpath = '/html/body/div[2]/div/div[3]/div/div[3]/div/div[1]/div[1]/div[2]/div[2]/div[4]/div[1]/div[1]/span/text()'

    def parse(self, response):
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url=url,callback=self.parse_main_item)
 
        nexter_page = response.xpath('/html/body/div[1]/div/div[3]/div/div[3]/div[5]/ul/li[9]/a/@href').extract_first()
        if nexter_page is None:
            next_page = response.xpath('/html/body/div[1]/div/div[3]/div/div[3]/div[5]/ul/li[8]/a/@href').extract_first()
            url = response.urljoin(next_page)
            yield scrapy.Request(url, callback=self.parse)
        else: 
            url = response.urljoin(nexter_page)
            yield scrapy.Request(url, callback=self.parse)
        
        # another_page = response.xpath('/html/body/div[1]/div/div[3]/div/div[3]/div[5]/ul/li[9]/a/@href').extract_first()
        # if another_page is not None:
        #     url = response.urljoin(next_page)
        #     yield scrapy.Request(url, callback=self.parse)

    def parse_main_item(self,response):
        item = PblSpider()
 
        Title = response.xpath('/html/body/div[1]/div/div[3]/div/div[3]/div/div[1]/div[1]/div[2]/div[2]/h1/text()').extract_first()
        Link = response.url
        Image = response.xpath('/html/body/div/div/div/div/div[3]/div/div[1]/div[1]/div[2]/div[1]/div/div/div[2]/div/img/@src').extract_first()
                                
        Price = response.xpath('/html/body/div/div/div[3]/div/div[3]/div/div[1]/div[1]/div[2]/div[2]/div/div[1]/div[1]/span/text()').extract_first()
        Price = self.clean(Price)
                                
        #Put each element into its item attribute.
        item['Title']          = Title
        item['Price']          = Price
        item['Image']          = Image
        item['Link']           = Link

        return item
    
    def clean(self, to_clean):
        if isinstance(to_clean, str):
            return re.sub('\s+', ' ', to_clean).strip()
        
        return [re.sub('\s+', ' ', d).strip()
                    for d in to_clean if d.strip()]