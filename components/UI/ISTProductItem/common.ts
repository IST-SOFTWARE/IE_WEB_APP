import {CSSProperties, Dispatch, SetStateAction} from "react";
import {ICatalogItem} from "./Abstract/ICatalogTypes";
import {ICartItem, ICartItem_properties_data} from "./Abstract/ICartTypes";
import { mobileTrigger_size } from "../common";

export type pit_catalog = "catalog"
export type pit_cart = "cart"

type productItemType = ICartItem | ICatalogItem;
type ISTProductItemStyles = Pick<CSSProperties, "margin">;

type callBack_fnc<T> = {
    flag?: boolean,
    sideEffect: Dispatch<T>
}

export type cartAdder_fnc = (...props: any) => any;

export type quantityEditor_fnc =
    (id: string | number, newQuantity: number, callBack?: callBack_fnc<number>) => Promise<boolean>

export type cartItemGetter_fnc =
    (id: string | number, callBack?: callBack_fnc<IProductData>) => Promise<IProductData>


export type deleteProduct_fnc = (id : string | number, callBack?: callBack_fnc<ICartItem_properties_data[]>) => Promise<boolean>


export type deleteProduct_props = {
    onDelete: (id : string | number, callBack?: callBack_fnc<ICartItem_properties_data[]>) => Promise<boolean>

    productsListSetter: Dispatch<ICartItem_properties_data[]>
}


export interface IProductData {
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
    currency: "RU" | "EN";
    cartSelector?: ICartSelector;
}


type ICartSelector_dispatch<T> = Dispatch<SetStateAction<T>>

export interface ICartSelector {
    id: number | string;
    selectedState: (number | string)[];
    setSelectedState: ICartSelector_dispatch<(number | string)[]>;
}





