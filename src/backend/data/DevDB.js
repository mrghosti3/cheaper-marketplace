import DataInterface from "./DataInterface.js";

export default class DevDB extends DataInterface {
    domains = [
        'https://www.rimi.lt',
        'https://www.maxima.lt'
    ];

    shop_icon_urls = [
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Rimi_Baltic_Logo.svg/220px-Rimi_Baltic_Logo.svg.png',
        'https://maxima.lt/build/website/images/maxima-logo.4153f9e6.svg'
    ];

    getProducts() {
        const product_urls = [
            this.domains[0] + '/e-parduotuve/lt/produktai/vaisiai-darzoves-ir-geles/vaisiai-ir-uogos/bananai/bananai-1-kg/p/270939',
            this.domains[0] + '/e-parduotuve/lt/produktai/bakaleja/kava-ir-kakava/kavos-kapsules/kavos-kapsules-aroma-gold-oat-flat-white-162g/p/1005450'
        ];

        return [
            {
                pid: 1,
                name: "Bananai",
                product_icon_url: 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_270939_KGM_LT',
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
                product_icon_url: 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_1005450_PCE_LT',
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
                        price: 2.00,
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
