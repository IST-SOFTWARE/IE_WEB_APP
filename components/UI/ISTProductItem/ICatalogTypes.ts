import {cartAdder_fnc, IProductData, IProductItem, pit_catalog} from "./common";
import ISTProductItem from "./ISTProductItem";
import React from "react";

export type ICatalogItem = {
    productType: pit_catalog;
    data: IProductData;

    parameters: {
        inline: boolean;
        cartAdder?: cartAdder_fnc
    };
};

export interface IProductItem_catalog extends Omit<IProductItem, "itemType"> {
    data: IProductData,
    cartaAdder?: cartAdder_fnc
}
