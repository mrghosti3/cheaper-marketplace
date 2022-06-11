import { tname as sname, tmodel as smodel } from "./shop.js";
import { tname as pname, tmodel as pmodel } from "./product.js";
import { tname as pdname, tmodel as pdmodel } from "./productData.js";

const models = [
    { name: pname, model: pmodel },
    { name: sname, model: smodel },
    { name: pdname, model: pdmodel }
];

export default function(seq) {
    const modelOpt = {
        timestamps: false,
        freezeTableName: true
    };
    return models.map((item) => seq.define(item.name, item.model, modelOpt));
}
