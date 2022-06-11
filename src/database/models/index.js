import { screate } from "./shop.js";
import { pcreate } from "./product.js";
import { pdcreate } from "./productData.js";

const modelFuncs = [ screate, pcreate, pdcreate ];
export const modelOpt = {
    timestamps: false,
    freezeTableName: true
};

export const initModels = (seq, DataTypes, modelOpt) => {
    return modelFuncs.map((create) => create(seq, DataTypes, modelOpt));
};
