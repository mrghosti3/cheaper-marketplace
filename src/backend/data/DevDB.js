import DataInterface from "./DataInterface.js";

const domains = [
    'https://www.rimi.lt',
    'https://www.maxima.lt'
];

const productUrls = [
    domains[0] + '/e-parduotuve/lt/produktai/vaisiai-darzoves-ir-geles/vaisiai-ir-uogos/bananai/bananai-1-kg/p/270939',
    domains[0] + '/e-parduotuve/lt/produktai/bakaleja/kava-ir-kakava/kavos-kapsules/kavos-kapsules-aroma-gold-oat-flat-white-162g/p/1005450'
];

const productIconUrls = [
    'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_270939_KGM_LT',
    'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_1005450_PCE_LT'
];

const shopIconUrls = [
    'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Rimi_Baltic_Logo.svg/220px-Rimi_Baltic_Logo.svg.png',
    'https://maxima.lt/build/website/images/maxima-logo.4153f9e6.svg'
];

export default class DevDB extends DataInterface {
    #shops = [
        {
            sid: 1,
            name: 'Rimi',
            url: domains[0],
            shopIconUrl: shopIconUrls[0]
        },
        {
            sid: 2,
            name: 'Maxima',
            url: domains[1],
            shopIconUrl: shopIconUrls[1]
        }
    ];

    #products = [
        {
            pid: 1,
            name: "Bananai",
            productIconUrl: productIconUrls[0],
            shops: [
                {
                    sid: 1,
                    name: 'Rimi',
                    url: domains[0],
                    price: 1.00,
                    productUrl: productUrls[0],
                    shopIconUrl: shopIconUrls[0],
                    lastScan: '2022-04-07'
                },
                {
                    sid: 2,
                    name: 'Maxima',
                    url: domains[1],
                    price: 1.00,
                    productUrl: productUrls[0],
                    shopIconUrl: shopIconUrls[1],
                    lastScan: '2022-04-07'
                }
            ]
        },
        {
            pid: 2,
            name: "Kava",
            productIconUrl: productIconUrls[1],
            shops: [
                {
                    sid: 1,
                    name: 'Rimi',
                    url: domains[0],
                    price: 1.00,
                    productUrl: productUrls[1],
                    shopIconUrl: shopIconUrls[0],
                    lastScan: '2022-04-07'
                },
                {
                    sid: 2,
                    name: 'Maxima',
                    url: domains[1],
                    price: 2.00,
                    productUrl: productUrls[1],
                    shopIconUrl: shopIconUrls[1],
                    lastScan: '2022-04-07'
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
