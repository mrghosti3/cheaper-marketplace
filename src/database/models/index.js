import { screate } from "./shop.js";
import { pcreate } from "./product.js";
import { sccreate } from "./scan.js";
import { cpcreate } from "./combined_prod.js"
import { prcreate } from "./product_relations.js";

const modelFuncs = [screate, pcreate, sccreate, cpcreate, prcreate];
export const modelOpt = {
    timestamps: false,
    freezeTableName: true
};

export const initModels = (seq, DataTypes, modelOpt) => {
    return modelFuncs.map((create) => create(seq, DataTypes, modelOpt));
};
