import {cartItemGetter_fnc, IProductItem, pit_cart, quantityEditor_fnc} from "./common";

type pit_cart_functional = "Functional";
type pit_cart_informational = "Informational";

type displayingOption = pit_cart_functional | pit_cart_informational

export interface ICartItem_properties {
    productId: number
    quantity: number,
    amountPrice: number,

    quantityEditor?: quantityEditor_fnc
    cartItemGetter?: cartItemGetter_fnc
}

export type ICartItem = {
    productType: pit_cart;
    data: ICartItem_properties;
    displayingOption: displayingOption;
}

export interface IProductItem_cart extends Omit<IProductItem, "itemType"> {
    data: ICartItem_properties
};