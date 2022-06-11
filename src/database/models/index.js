import { screate } from "./shop.js";
import { pcreate } from "./product.js";
import { pdcreate } from "./productData.js";
import { ppcreate } from "./productPrices.js";
import { tcreate } from "./tag.js";
import { ptcreate, stcreate } from "./combinedTags.js";

const modelFuncs = [
    screate, pcreate, pdcreate, ppcreate,
    tcreate, ptcreate, stcreate
];
export const modelOpt = {
    timestamps: false,
    freezeTableName: true
};

export const initModels = (seq, DataTypes, modelOpt) => {
    return modelFuncs.map((create) => create(seq, DataTypes, modelOpt));
};
