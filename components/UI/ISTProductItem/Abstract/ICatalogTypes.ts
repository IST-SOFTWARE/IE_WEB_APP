import {IProductItem, pit_catalog} from "../common";
import ISTProductItem from "../ISTProductItem";
import React from "react";
import {cartAdder_fnc, deleteProduct_fnc_onDelete, IProductData} from "../../common";

export type ICatalogItem = {
    productType: pit_catalog;
    data: IProductData;

    parameters: {
        inline: boolean;
        cartStatus?: boolean;

        cartAdder?: cartAdder_fnc;
        cartRemover?: deleteProduct_fnc_onDelete;
    };
};

export interface IProductItem_catalog extends Omit<IProductItem, "itemType" | "mobileSettings" | "cartSelector"> {
    data: IProductData,
    cartStatus?: boolean,

    cartAdder?: cartAdder_fnc,
    cartRemover?:  deleteProduct_fnc_onDelete,
}
