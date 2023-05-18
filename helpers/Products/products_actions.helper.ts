import {ICartItem_properties_data} from "../../components/UI/ISTProductItem/ICartTypes";

export const products_editQuantity_actionsHelper = (
    data:ICartItem_properties_data[],
    id: string | number,
    newQuantity: number
): ICartItem_properties_data[] => {

        const indexProductInCartCollection = data.findIndex((cartItem) => {
            return cartItem.productId.toString() === id.toString();
        });

        const updatedProduct = {
            productId: id,
            quantity: newQuantity,
            amountPrice: null
        } as ICartItem_properties_data;

        const left = data.slice(0, indexProductInCartCollection);
        const right = data.slice(
            indexProductInCartCollection + 1,
            data.length
        );

     return [...left, updatedProduct, ...right]
}

export const products_removeItem_actionsHelper = (
    data:ICartItem_properties_data[],
    id: string | number
): ICartItem_properties_data[] => {

    return data.filter((product) =>
        product.productId !== id.toString()
    );
}