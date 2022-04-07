import scrapy
from bs4 import BeautifulSoup
import re
from pbl.items import PblSpider


class SpidergintarineSpider(scrapy.Spider):
    name = 'spiderGintarine'
    allowed_domains = ['www.gintarine.lt']
    start_urls = ['http://www.gintarine.lt/']

    def __init__(self):
        self.declare_xpath()

    def declare_xpath(self):
        self.getAllCategoriesXpath = '/html/body/div[1]/div[3]/div/header[2]/div/div[2]/div/nav[2]/div/ul/li/a/@href'
        self.getAllSubCategoriesXpath = '/html/body/div[1]/div[3]/div/main/div[3]/div/div/a/@href'
        self.getAllItemsXpath = '/html/body/div[1]/div[3]/div/div[2]/div/main/div[2]/div[2]/div[2]/div/form[1]/div/div/a/@href'
        self.TitleXpath  = '/html/body/div[1]/div[3]/div/div[3]/div/main/div[1]/div[1]/h1/text()'
        self.ImageXpath = '/html/body/div[1]/div[3]/div/div[3]/div/main/div[1]/div[2]/div/div/div[2]/div/div/div/div/img/@src'      
        self.PriceXpath = '/html/body/div[1]/div[3]/div/div[3]/div/main/div[2]/div/div[2]/form/div[1]/div/div[1]/text()'

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
