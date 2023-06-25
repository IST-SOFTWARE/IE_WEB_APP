import {Dispatch, ReactNode, SetStateAction} from "react";
import {
    cartItemGetter_fnc,
    deleteProduct_fnc_onDelete,
    deleteProduct_fnc,
    IProductData,
    mobileTrigger_size, quantityEditor_fnc
} from "../../common";

import {
    IProductItem,
    pit_cart
} from "../common";
import {quantityEditor_onChange, quantityEditor_onDelete} from "../QuantityEditor/IQuantityEditor";

export type ICartItem_properties_data = {
    productId: number | string,
    quantity: number
}

export interface ICartItem_properties extends ICartItem_properties_data{
    quantityEditor?: quantityEditor_fnc
    cartItemGetter?: cartItemGetter_fnc
    deleteProduct?: deleteProduct_fnc
}

export type ICartItem = {
    productType: pit_cart;
    mobileSettings?: mobileSettings;
    data: ICartItem_properties;
    cartSelector?: ICartSelector;
}

export interface IProductItem_cart {
    productData: IProductData,
    currentQuantity: number,
    checkedState?: boolean,

    onEditQuantity: quantityEditor_onChange,
    onRemoveItem: quantityEditor_onDelete,

};

type ICartSelector_dispatch<T> = Dispatch<SetStateAction<T>>

export type ICartSelector_type = {
    id: number | string;
    quantity: number | string;
    price?: number | string;
}

export interface ICartSelector {
    data: ICartSelector_type
    selectedState: ICartSelector_type[];
    setSelectedState: ICartSelector_dispatch<ICartSelector_type[]>;
}

interface mobileSettings {
    mobileSizeTrigger: mobileTrigger_size;
}

export interface IProductItem_distributor extends Omit<IProductItem, "itemType">  {
    data: ICartItem_properties;
    mobileSettings?: mobileSettings;
    cartSelector?: ICartSelector;
}

