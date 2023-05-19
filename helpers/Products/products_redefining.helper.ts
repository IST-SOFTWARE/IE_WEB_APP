import {ICartItem_properties_data} from "../../components/UI/ISTProductItem/Abstract/ICartTypes";
import {ICartItem} from "../../queries/cart/cartActions";


export const redefining_to_CartModel_redefiningHelper = (
    data: ICartItem_properties_data[]
): ICartItem[] => {

    return data.map(el => {
        return {
            product_id: el.productId,
            quantity: el.quantity,
            price: null,
        } as ICartItem;
    });

};


export const redefining_to_ICartItemPropertiesData_redefiningHelper = (
    data: ICartItem[]
): ICartItem_properties_data[] => {

    return  data.map(el => {
        return {

            productId: el.product_id,
            quantity: el.quantity,
            amountPrice: el.price,

        } as ICartItem_properties_data;
    });

};
