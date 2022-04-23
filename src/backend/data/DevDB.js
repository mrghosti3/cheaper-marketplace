import DataInterface from "./DataInterface.js";

export default class DevDB extends DataInterface {
    domains = [
        'www.rimi.lt',
        'www.maxima.lt'
    ];

    shop_icon_urls = [
        this.domains[0] + '/shop_icon_path',
        this.domains[1] + '/shop_icon_path'
    ];

    getProducts() {
        const product_urls = [
            this.domains[0] + '/product_path',
            this.domains[1] + '/product_path'
        ];

        return [
            {
                pid: 1,
                name: "Bananai",
                product_icon_url: this.domains[0] + '/product_icon_path',
                shops: [
                    {
                        sid: 1,
                        url: this.domains[0],
                        price: 1.00,
                        product_url: product_urls[0],
                        shop_icon_url: this.shop_icon_urls[0],
                        last_scan: '2022-04-07'
                    },
                    {
                        sid: 2,
                        url: this.domains[1],
                        price: 1.00,
                        product_url: product_urls[0],
                        shop_icon_url: this.shop_icon_urls[1],
                        last_scan: '2022-04-07'
                    }
                ]
            },
            {
                pid: 2,
                name: "Kava",
                product_icon_url: this.domains[0] + '/product_icon_path',
                shops: [
                    {
                        sid: 1,
                        url: this.domains[0],
                        price: 1.00,
                        product_url: product_urls[1],
                        shop_icon_url: this.shop_icon_urls[0],
                        last_scan: '2022-04-07'
                    },
                    {
                        sid: 2,
                        url: this.domains[1],
                        price: 1.00,
                        product_url: product_urls[1],
                        shop_icon_url: this.shop_icon_urls[1],
                        last_scan: '2022-04-07'
                    }
                ]
            }
        ];
    }

    getShops() {
        return [
            {
                sid: 1,
                url: this.domains[0],
                shop_icon_url: this.shop_icon_urls[0]
            },
            {
                sid: 2,
                url: this.domains[1],
                shop_icon_url: this.shop_icon_urls[1]
            }
        ];
    }

    getTags() {
        return [
            { hello: "world" }
        ];
    }
}
