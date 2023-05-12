import { Dispatch, ReactNode } from "react";
import { mobileTrigger_size } from "../common";
import {cartItemGetter_fnc, IProductData, IProductItem, pit_cart, quantityEditor_fnc} from "./common";

export interface ICartItem_properties {
    productId: number | string,
    quantity: number,
    amountPrice: number | string,

    quantityEditor?: quantityEditor_fnc
    cartItemGetter?: cartItemGetter_fnc
}

export type ICartItem = {
    productType: pit_cart;
    data: ICartItem_properties;
}

export interface IProductItem_cart extends Omit<IProductItem, "itemType" | "mobileSettings"> {
    data: ICartItem_properties;
};

export interface IProductItem_distributer extends Omit<IProductItem, "itemType">  {
    data: ICartItem_properties;
}