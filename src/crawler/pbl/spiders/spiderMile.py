import scrapy
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
url = 'https://lastmile.lt/home'

''' 
ID OF THE SPIDER = 7
'''

class SpidermileSpider(scrapy.Spider):
    name = 'spiderMile'
    allowed_domains = ['lastmile.lt']
    start_urls = ['https://lastmile.lt/home']


    def start_requests(self):
        yield SeleniumRequest(
    url=url,
    callback=self.parse,
    wait_time=10,
    )

    def parse(self, response):
        print(100 * '-')
        print(response.xpath('//*[@id="chakra-modal--body-1"]/div[1]/div/button[1]'))
        print(100 * '-')
 