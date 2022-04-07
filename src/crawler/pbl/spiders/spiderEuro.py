import json
import scrapy
from bs4 import BeautifulSoup
import re
from pbl.items import PblSpider

class SpidereuroSpider(scrapy.Spider):
    name = 'spiderEuro'
    allowed_domains = ['www.eurovaistine.lt']
    start_urls = ['http://www.eurovaistine.lt/']

    def __init__(self):
        self.declare_xpath()

    def declare_xpath(self):
        self.getAllCategoriesXpath = '/html/body/div[2]/div/nav/div/span/a/@href'
        self.getAllItemsXpath = '/html/body/div[4]/div[1]/div[2]/div[5]/div/div/div/a/@href'
        self.TitleXpath  = '/html/body/div[3]/div/div[1]/div/div/div[1]/div[2]/h1/text()'
        self.ImageXpath = '/html/body/div[3]/div/div[1]/div/div/div[1]/div[1]/div[2]/div/div/div[3]/div/img/@src'      
        self.PriceXpath = '//*[@id="product-variants-form"]/div[1]/text()'

    def parse(self, response):
        for href in response.xpath(self.getAllCategoriesXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url=url,callback=self.parse_items, dont_filter=True)

    def parse_items(self,response):
        #data = json.loads(response.body)
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url, self.parse_main_item, dont_filter=True)
                        
        next_page = response.xpath('/html/body/div[4]/div[1]/div[2]/div[6]/button/@data-url').extract_first()
        if next_page is not None:
            url = response.urljoin(next_page)
            yield scrapy.Request(url, callback=self.parse_items, dont_filter=True)


    def parse_main_item(self,response):
            item = PblSpider()
    
            Title = response.xpath(self.TitleXpath).extract()
            Title = self.cleanText(self.parseText(self.listToStr(Title)))

            #Category = response.xpath(self.CategoryXpath).extract()
            #Category = self.cleanText(self.parseText(Category))
            Link = response.url
            
            Image = response.xpath(self.ImageXpath).extract_first()

            Price = response.xpath(self.PriceXpath).extract()
            Price = self.cleanText(self.parseText(self.listToStr(Price)))

            #Put each element into its item attribute.
            item['Title']          = Title
            #item['Category']      = Category
            item['Price']          = Price
            #item['Features']      = Features
            item['Image']          = Image
            item['Link']           = Link

            return item
    
        #Methods to clean and format text to make it easier to work with later
    def listToStr(self,MyList):
            dumm = ""
            MyList = [i.encode('utf-8') for i in MyList]
            for i in MyList:dumm = "{0}{1}".format(dumm,i)
            return dumm
    
    def parseText(self, str):
            soup = BeautifulSoup(str, 'html.parser')
            return re.sub(" +|\n|\r|\t|\0|\x0b|\xa0",' ',soup.get_text()).strip()
    
    def cleanText(self,text):
            soup = BeautifulSoup(text,'html.parser')
            text = soup.get_text()
            text = re.sub("( +|\n|\r|\t|\0|\x0b|\xa0|\xbb|\xab)+",' ',text).strip()
            return text