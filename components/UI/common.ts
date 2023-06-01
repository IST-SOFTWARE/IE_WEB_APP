import {CSSProperties, Dispatch} from "react";
import {ICartItem_properties_data} from "./ISTProductItem/Abstract/ICartTypes";

export type mobileTrigger_size = "XXL_1400" | "XL_1200" | "LG_992" | "MD_768" | "SM_576"

export type commonStyles =
    Pick<CSSProperties, "borderRadius" | "height">

export type cstmStyles = {
    [key: string] : string,
}

export type callBack_fnc<T> = {
    flag?: boolean,
    sideEffect: Dispatch<T>
}

export const maxLengthText = (text: string, length: number): string => {
   return text.length >= length ? `${text.slice(0, length)}...` : text;
}


/**
 *  -= PRODUCTS TYPES =-
 */
export interface IProductData {
    id: number | string;
    image?: string;
    title: string;
    price: string;
    vendCode: string;
    slug?: string
}

export type deleteProduct_fnc = {
    onDelete: deleteProduct_fnc_onDelete;
    productsListSetter: Dispatch<ICartItem_properties_data[]>
}

export type cartAdder_fnc = cartAdder_fnc_onAdd;

/**
 * -= PRODUCT ACTION TYPES =-
 */

export type cartItemGetter_fnc =
    (id: string | number, callBack?: callBack_fnc<IProductData>) => Promise<IProductData>

export type deleteProduct_fnc_onDelete =
    (id: string | number, callBack?: callBack_fnc<ICartItem_properties_data[]>) => Promise<boolean>

export type cartAdder_fnc_onAdd =
    (id: string | number, callBack?: callBack_fnc<ICartItem_properties_data[]>) => Promise<boolean>;

export type quantityEditor_fnc =
    (id: string | number, newQuantity: number, callBack?: callBack_fnc<number>) => Promise<boolean>

