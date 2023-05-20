import { Dispatch, ReactNode } from "react";
import {
    cartItemGetter_fnc,
    deleteProduct_fnc,
    deleteProduct_props,
    IProductData,
    mobileTrigger_size, quantityEditor_fnc
} from "../../common";
import {
    IProductItem,
    pit_cart
} from "../common";

export type ICartItem_properties_data = {
    productId: number | string,
    quantity: number,
    amountPrice: number | string,

}

export interface ICartItem_properties extends ICartItem_properties_data{
    quantityEditor?: quantityEditor_fnc
    cartItemGetter?: cartItemGetter_fnc
    deleteProduct?: deleteProduct_props
}

export type ICartItem = {
    productType: pit_cart;
    mobileSettings?: mobileSettings;
    data: ICartItem_properties;
}

export interface IProductItem_cart extends Omit<IProductItem, "itemType"> {
    data: ICartItem_properties;
};

export interface IProductItem_distributor extends Omit<IProductItem, "itemType">  {
    data: ICartItem_properties;
    mobileSettings?: mobileSettings
}

interface mobileSettings {
    mobileSizeTrigger: mobileTrigger_size;
}