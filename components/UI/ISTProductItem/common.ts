import {CSSProperties, Dispatch, SetStateAction} from "react";
import {ICatalogItem} from "./Abstract/ICatalogTypes";
import {ICartItem} from "./Abstract/ICartTypes";

export type pit_catalog = "catalog"
export type pit_cart = "cart"

type productItemType = ICartItem | ICatalogItem;
type ISTProductItemStyles = Pick<CSSProperties, "margin">;


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





