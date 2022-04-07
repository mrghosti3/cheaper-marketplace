import scrapy
from bs4 import BeautifulSoup
import re
from pbl.items import PblSpider
from scrapy_splash import SplashRequest


base_url = 'https://www.topocentras.lt'


class PblItem(scrapy.Spider):

    name = 'spiderTopo'
    allowed_domains = ['topocentras.lt']
    start_urls = ['https://www.topocentras.lt/']
    headers = {
        'USER-AGENT':'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    }

    def start_requests(self):
        pass

    def __init__(self):
        self.declare_xpath()

    def declare_xpath(self):
        self.getAllCategoriesXpath = '/html/body/div[1]/header[1]/nav/ul/li[1]/div/ul[1]/li/a/@href'
        self.getAllSubCategoriesXpath = '/html/body/div/main/div/section/div/div/section/div/div/div/a/@href'
        self.getAllItemsXpath = '/html/body/div[1]/main/div/section[1]/div[4]/div/article/div/a/@href'
        self.TitleXpath  = '//*[@id="productPage"]/div[2]/div/article/h1/text()'
        self.ImageXpath = '/html/body/div[2]/main/div[1]/div[2]/div/article/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/img/@src'      
        self.PriceXpath = '/html/body/div[2]/main/div[1]/div[2]/div/article/div[2]/div[3]/div[1]/div[2]/div/span/text()'
    

    def parse(self, response):
        for href in response.xpath(self.getAllCategoriesXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_category, headers=self.headers, dont_filter=True)
 
    def parse_category(self,response):
        for href in response.xpath(self.getAllSubCategoriesXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_subcategory, headers=self.headers, dont_filter=True)

    def parse_subcategory(self,response):
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url, headers=self.headers, callback=self.parse_main_item,dont_filter=True)

        #next_page = response.xpath('/html/body/main/section/div[1]/div/div[2]/div[1]/div/div[2]/div[3]/ul/li/a[@rel="next"]/@href').extract_first()
        #if next_page is not None:
        #    url = response.urljoin(next_page)
        #    yield scrapy.Request(url, callback=self.parse_category, dont_filter=True)
    
    def parse_main_item(self,response):
         item = PblSpider()
 
         Title = response.xpath(self.TitleXpath).extract()
         Title = self.cleanText(self.parseText(self.listToStr(Title)))

         Link = response.url
        
         Image = response.xpath(self.ImageXpath).extract_first()

         Price = response.xpath(self.PriceXpath).extract()
         Price = self.cleanText(self.parseText(self.listToStr(Price)))

    #     #Put each element into its item attribute.
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


