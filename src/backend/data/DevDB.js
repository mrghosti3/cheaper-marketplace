import DataInterface from "./DataInterface.js";

const domains = [
    'https://www.rimi.lt',
    'https://www.maxima.lt'
];

const product_urls = [
    domains[0] + '/e-parduotuve/lt/produktai/vaisiai-darzoves-ir-geles/vaisiai-ir-uogos/bananai/bananai-1-kg/p/270939',
    domains[0] + '/e-parduotuve/lt/produktai/bakaleja/kava-ir-kakava/kavos-kapsules/kavos-kapsules-aroma-gold-oat-flat-white-162g/p/1005450'
];

const product_icon_urls = [
    'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_270939_KGM_LT',
    'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_1005450_PCE_LT'
];

const shop_icon_urls = [
    'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Rimi_Baltic_Logo.svg/220px-Rimi_Baltic_Logo.svg.png',
    'https://maxima.lt/build/website/images/maxima-logo.4153f9e6.svg'
];

export default class DevDB extends DataInterface {
    #shops = [
        {
            sid: 1,
            url: domains[0],
            shop_icon_url: shop_icon_urls[0]
        },
        {
            sid: 2,
            url: domains[1],
            shop_icon_url: shop_icon_urls[1]
        }
    ];

    #products = [
        {
            pid: 1,
            name: "Bananai",
            product_icon_url: product_icon_urls[0],
            shops: [
                {
                    sid: 1,
                    url: domains[0],
                    price: 1.00,
                    product_url: product_urls[0],
                    shop_icon_url: shop_icon_urls[0],
                    last_scan: '2022-04-07'
                },
                {
                    sid: 2,
                    url: domains[1],
                    price: 1.00,
                    product_url: product_urls[0],
                    shop_icon_url: shop_icon_urls[1],
                    last_scan: '2022-04-07'
                }
            ]
        },
        {
            pid: 2,
            name: "Kava",
            product_icon_url: product_icon_urls[1],
            shops: [
                {
                    sid: 1,
                    url: domains[0],
                    price: 1.00,
                    product_url: product_urls[1],
                    shop_icon_url: shop_icon_urls[0],
                    last_scan: '2022-04-07'
                },
                {
                    sid: 2,
                    url: domains[1],
                    price: 2.00,
                    product_url: product_urls[1],
                    shop_icon_url: shop_icon_urls[1],
                    last_scan: '2022-04-07'
                }
            ]
        }
    ];

    #tags = [
        {
            id: 1,
            tag: 'Bananas'
        },
        {
            id: 2,
            tag: 'Jogurtas'
        },
        {
            id: 3,
            tag: 'Rimi'
        },
        {
            id: 4,
            tag: 'Maxima'
        }
    ]

    async getProducts(greater, less, limit, page) {
        let res = this.#products;
        res = this.#pageSlice(res, limit, page)
        return Promise.resolve(res);
    }

    async getShops(limit, page) {
        let res = this.#shops;
        res = this.#pageSlice(res, limit, page)
        return Promise.resolve(res);
    }

    async getTags(limit, page) {
        let res = this.#tags;
        res = this.#pageSlice(res, limit, page)
        return Promise.resolve(res);
    }

    /**
     * Splits array via paging.
     *
     * @param {Array}  arr   list to split
     * @param {Number} limit Product count in page. 0 -> no limit
     * @param {Number} page  Page number
     * @returns {Array} JSON list
     */
    #pageSlice(arr, limit, page) {
        if (limit < 1) return arr;

        const offset = limit * page;
        const range = offset + limit;
        return arr.slice(offset, range);
    }
}
