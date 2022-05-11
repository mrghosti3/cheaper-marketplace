import scrapy
from pbl.items import PblSpider

base_url = 'https://www.rimi.lt'

class PblItem(scrapy.Spider):
    name = 'spiderRimi'
    allowed_domains = ['rimi.lt']
    start_urls = ['https://www.rimi.lt/e-parduotuve/']

    def __init__(self):
        self.declare_xpath()

        #All the XPaths the spider needs to know go here
    def declare_xpath(self):
        self.getAllCategoriesXpath = '/html/body/main/nav[1]/div/ul/li[1]/a[1]/@href'
        self.getAllItemsXpath = '/html/body/main/section/div[1]/div/div[2]/div[1]/div/div[2]/ul/li/div/a/@href'
        self.TitleXpath  = '/html/body/main/section/div[1]/div/div[2]/section/div/div/div[2]/h3/text()'
        self.ImageXpath = '/html/body/main/section/div[1]/div/div[2]/section/div/div/div[1]/img/@src'      
        self.PriceXpath = '//*[@id="main"]/section/div[1]/div/div[2]/section/div/div/div[2]/div[1]/div[1]/span/text()'
        self.SubPriceXpath = '//*[@id="main"]/section/div[1]/div/div[2]/section/div/div/div[2]/div[1]/div[1]/div/sup/text()'

    def parse(self, response):
        for href in response.xpath(self.getAllCategoriesXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url=url,callback=self.parse_category, dont_filter=True)
 
    def parse_category(self,response):
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_main_item, dont_filter=True)

        next_page = response.xpath('/html/body/main/section/div[1]/div/div[2]/div[1]/div/div[2]/div[3]/ul/li/a[@rel="next"]/@href').extract_first()
        if next_page is not None:
            url = response.urljoin(next_page)
            yield scrapy.Request(url, callback=self.parse_category, dont_filter=True)
    
    def parse_main_item(self,response):
        item = PblSpider()
 
        Title = response.xpath(self.TitleXpath).extract_first()
        Link = response.url
        Image = response.xpath(self.ImageXpath).extract_first()
        Price = response.xpath(self.PriceXpath).extract_first()
        sub_price = response.xpath(self.SubPriceXpath).extract_first()

        WholePrice = Price + "." + sub_price

        #Put each element into its item attribute.
        item['Title']          = Title
        #item['Category']      = Category
        item['Price']          = WholePrice
        #item['Features']      = Features
        item['Image']          = Image
        item['Link']           = Link

        return item
 


