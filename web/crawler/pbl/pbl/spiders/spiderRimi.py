import scrapy
from bs4 import BeautifulSoup
import re
from pbl.items import PblSpider


class PblItem(scrapy.Spider):
    name = 'spiderRimi'
    allowed_domains = ['rimi.lt']
    start_urls = ['https://www.rimi.lt/e-parduotuve/']
    

    def __init__(self):
        self.declare_xpath()

        #All the XPaths the spider needs to know go here
    def declare_xpath(self):
        self.getAllCategoriesXpath = '/html/body/main/nav[1]/div/ul/li[1]/a/@href'
        #self.getAllSubCategoriesXpath = ""
        self.getAllItemsXpath = '//*[@id="main"]/section/div[1]/div/div[2]/div[1]/div/div[2]/ul/li/div/a/@href'
        self.TitleXpath  = '//*[@id="main"]/section/div[1]/div/div[2]/section/div/div/div[2]/h3//text()'
        self.PriceXpath = '//*[@id="main"]/section/div[1]/div/div[2]/section/div/div/div[2]/div[1]/div[1]/span'
        self.SubPriceXpath = '//*[@id="main"]/section/div[1]/div/div[2]/section/div/div/div[2]/div[1]/div[1]/div/sup'

    def parse(self, response):
        for href in response.xpath(self.getAllCategoriesXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url=url,callback=self.parse_category, dont_filter=True)
 
    def parse_category(self,response):
        for href in response.xpath(self.getAllItemsXpath):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url,callback=self.parse_main_item, dont_filter=True)

            next_page = response.xpath('//*[@id="main"]/section/div[1]/div/div[2]/div[1]/div/div[2]/div[3]/ul/li/a/@href').extract_first()
            if next_page is not None:
                url = response.urljoin(next_page)

    #def parse_subcategory(self,response):
    #    for href in response.xpath(self.getAllItemsXpath):
    #       url = response.urljoin(href.extract())
    #       yield scrapy.Request(url,callback=self.parse_main_item)

    
    def parse_main_item(self,response):
        item = PblSpider()
 
        Title = response.xpath(self.TitleXpath).extract()
        Title = self.cleanText(self.parseText(self.listToStr(Title)))
 
        #Category = response.xpath(self.CategoryXpath).extract()
        #Category = self.cleanText(self.parseText(Category))
 
        Price = response.xpath(self.PriceXpath).extract()
        Price = self.cleanText(self.parseText(self.listToStr(Price)))

        sub_price = response.xpath(self.SubPriceXpath).extract()
        sub_price = self.cleanText(self.parseText(self.listToStr(sub_price)))

        WholePrice = Price + "." + sub_price

        #Features = response.xpath(self.FeaturesXpath).extract()
        #Features = self.cleanText(self.parseText(self.listToStr(Features)))
 
        #Description = response.xpath(self.DescriptionXpath).extract()
        #Description = self.cleanText(self.parseText(self.listToStr(Description)))

        #Specs = response.xpath(self.SpecsXpath).extract()
        #Specs = self.cleanText(self.parseText(Specs))

        #Put each element into its item attribute.
        item['Title']           = Title
        #item['Category']        = Category
        item['Price']           = WholePrice
        #item['Features']        = Features
        #item['Description']     = Description
        #item['Specs']           = Specs
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