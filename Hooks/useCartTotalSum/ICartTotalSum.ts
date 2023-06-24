import {cartItemGetter_fnc} from "../../components/UI/common";
import {ReactNode} from "react";

export type ICartTotalSum_prodsInf = {
    productId: string | number
    pricePerItem: number
}

export interface ICartTotalSum {
    cartSelector: (number | string)[];
    getProductByIdQuery_func?: cartItemGetter_fnc;
    acceptOrder_func?: () => any;
    children?: ReactNode
}