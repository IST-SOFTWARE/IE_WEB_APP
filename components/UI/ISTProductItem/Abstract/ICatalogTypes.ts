import {IProductItem, pit_catalog} from "../common";
import ISTProductItem from "../ISTProductItem";
import React from "react";
import {cartAdder_fnc, IProductData} from "../../common";

export type ICatalogItem = {
    productType: pit_catalog;
    data: IProductData;

    parameters: {
        inline: boolean;
        cartAdder?: cartAdder_fnc;
        cartStatus?: boolean;
    };
};

export interface IProductItem_catalog extends Omit<IProductItem, "itemType" | "mobileSettings" | "cartSelector"> {
    data: IProductData,
    cartaAdder?: cartAdder_fnc,
    cartStatus?: boolean
}
