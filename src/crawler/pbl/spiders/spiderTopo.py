import scrapy
from scrapy import Request 
from pbl.items import PblSpider
from scrapy.loader import ItemLoader
from math import ceil 

''' 
ID OF THE SPIDER = 11
'''

base_url = 'https://www.topocentras.lt'

headers = {
        'USER-AGENT':'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    }

product_template = 'https://www.topocentras.lt/graphql?query=ROOT_GetProduct&vars=%7B%22urlKey%22%3A%22{}%22%7D'

class PblItem(scrapy.Spider):

    name = 'spiderTopo'
    allowed_domains = ['topocentras.lt']
    start_urls = ['https://www.topocentras.lt/graphql?query=getMenu']
    headers = {
        'USER-AGENT':'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    }

    listing_template = 'https://www.topocentras.lt/graphql?formVars=%7B%22sort%22%3A%22discount%22%2C%22filters%22%3A%7B%7D%7D&query=getCatalog&vars=%7B%22categoryId%22%3A{}%2C%22pageSize%22%3A80%2C%22currentPage%22%3A{}%7D'
    product_template = 'https://www.topocentras.lt/graphql?query=ROOT_GetProduct&vars=%7B%22urlKey%22%3A%22{}%22%7D'
    
    category_template = 'https://www.topocentras.lt/graphql?query=ROOT_GetCategory&vars=%7B%22id%22%3A{}%7D'
    
    post_body_template =  '{{"query":"urlResolver","vars":{{"urlKey":"/{}"}}}}'


    def parse(self, response):
        data = response.json()
        categories_items = [(item['menu_url'],item['name']) for item in data['data']['category']['children'][2]['children']]
        for menu_url,name in categories_items :
            yield Request(
                'https://www.topocentras.lt/graphql',
                method='POST',
                body=self.post_body_template.format(menu_url),
                callback=self.parse_root_category_id,
                dont_filter=True,
                meta={
                    'name':name
                }
            )
            
    def parse_root_category_id(self,response):
        category_id = response.json()['data']['urlResolver']['id']
        yield Request(
            self.category_template.format(category_id),
            callback=self.parse_category,
            meta={
                'name':response.meta['name']
            }
        )


    def parse_category(self,response):
        mode = response.json()['data']['category']['display_mode']
        if mode == 'PAGE':
            sub_cats_ids = [item['id'] for item in response.json()['data']['category']['children']]
            for id_value in sub_cats_ids :
                yield Request(
                    self.category_template.format(id_value),
                    callback=self.parse_category,
                    meta={
                        'id':id_value
                    }
                )
        elif mode == 'PRODUCTS' :
            yield Request(
                self.listing_template.format(response.meta['id'],1),
                callback=self.parse_listing,
                meta={
                    'id':response.meta['id']
                }
                
            )
        
    
    def parse_listing(self,response):
        total_pages = self.get_total_pages(response)
        for page in range(1,total_pages+1):
            yield Request(
                self.listing_template.format(
                    response.meta['id'],
                    page
                ),
                callback=self.parse_products,
                dont_filter=True
            )
        
    def parse_products(self,response):
        urls_keys = [item['url_key'] for item in response.json()['data']['products']['items']]
        for url_key in urls_keys :
            yield Request(
                self.product_template.format(url_key),
                callback=self.parse_product,
                meta={
                    'url_key':url_key
                }
            )
            
    def parse_product(self,response):
        data = response.json()
        loader = ItemLoader(PblSpider(),response)
        loader.add_value('Title',data['data']['productDetail']['items'][0]['name'])
        loader.add_value('Link','https://www.topocentras.lt/{}.html'.format(response.meta['url_key']))
        loader.add_value('Image',response.urljoin(data['data']['productDetail']['items'][0]['meta_image']))
        loader.add_value('Price',data['data']['productDetail']['items'][0]['price']['regularPrice']['amount']['value'])
        yield loader.load_item()


    def get_total_pages(self,response):
        return ceil(response.json().get('data').get('products')['total_count']/50)