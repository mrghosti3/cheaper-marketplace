import scrapy
from pbl.items import PblSpider

class SpiderpiguSpider(scrapy.Spider):
    name = 'spiderPigu'
    allowed_domains = ['pigu.lt']
    start_urls = ['https://pigu.lt/lt/']

    def __init__(self):
        self.declare_xpath()

        #All the XPaths the spider needs to know go here
    def declare_xpath(self):
        self.getAllCategoriesXpath = '/html/body/div/div/div/div/div/div/div/ul/li/ul/li/a/@href'
        self.getAllSubCategoriesXpath = '/html/body/div/div/section/div/div/div/div/div/div/div/div/a/@href'
        self.getAllSubSubCategoriesXpath = '/html/body/div/div/section/div/div/div/div/div/div/div/div/a/@href'
        self.getAllSubSubSubCategoriesXpath = '/html/body/div/div/section/div/div/div/div/div/div/div/div/a/@href'
        self.getAllItemsXpath = '/html/body/div/div/section/div/div/div/section/div/div/div/div/div/a/@href'
        self.TitleXpath  = '/html/body/div[1]/div[8]/div[1]/div[1]/section[1]/div[1]/h1/text()'
        self.ImageXpath = '/html/body/div[1]/div[8]/div[1]/div[1]/section[1]/div[1]/div[2]/div[2]/div[2]/div[1]/div[1]/div[2]/img/@src'      
        self.PriceXpath = '/html/body/div[1]/div[8]/div[1]/div[1]/section[1]/div[1]/div[2]/div[3]/div[8]/div[2]/div/div/meta/@content'

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
                yield scrapy.Request(url=url,callback=self.parse_sub_sub_subcategory, dont_filter=True)
        else: 
            self.parse_items

    def parse_sub_sub_subcategory(self, response):
        if response.xpath(self.getAllSubSubSubCategoriesXpath):
            for href in response.xpath(self.getAllSubSubSubCategoriesXpath):
                url = response.urljoin(href.extract())
                yield scrapy.Request(url=url,callback=self.parse_items, dont_filter=True)
        else: 
            self.parse_items

    def parse_items(self,response):
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_main_item, dont_filter=True)

        next_page = response.xpath('/html/body/div[1]/div[8]/section[3]/div/div/div[2]/section/div[9]/div[1]/a[2]/@href').extract_first()
        if next_page is not None:
            url = response.urljoin(next_page)
            yield scrapy.Request(url, callback=self.parse_items, dont_filter=True)
    
    def parse_main_item(self,response):
        item = PblSpider()
 
        Title = response.xpath(self.TitleXpath).extract_first()
        Link = response.url
        Image = response.xpath(self.ImageXpath).extract_first()
        Price = response.xpath(self.PriceXpath).extract_first()

        #Put each element into its item attribute.
        item['Title']          = Title
        #item['Category']      = Category
        item['Price']          = Price
        #item['Features']      = Features
        item['Image']          = Image
        item['Link']           = Link

        return item
