import {CSSProperties} from "react";
import {ICatalogItem} from "./ICatalogTypes";
import {ICartItem} from "./ICartTypes";

export type pit_catalog = "catalog"
export type pit_cart = "cart"

type productItemType = ICartItem | ICatalogItem;
type ISTProductItemStyles = Pick<CSSProperties, "margin">;

export type cartAdder_fnc = (...props: any) => any;
export type quantityEditor_fnc = (id: string, newQuantity: number) => boolean
export type cartItemGetter_fnc = (id: string) => IProductData

export interface IProductData{
    id: number | string;
    image?: string;
    title: string;
    price: string;
    vendCode: string;
    slug?: string
}

export interface IProductItem {
    itemType: productItemType;
    style?: ISTProductItemStyles;
    currency: "RU" | "EN"; //откуда каренси прилетает?
}




