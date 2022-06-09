import { useQuery, useMutation } from "react-query";
import setData from "../helpers/setData";
import { createCart, updateCart, getCart} from "../queries/cartMoves";
import getData from "../queries/getData";

export async function getCartItems(){

    let BaseCart = [];
    await getData(getCart, 'cartCollection_by_id', {id: localStorage.getItem('cart_session')}).
    then(elem => {
            if(elem){
                BaseCart = elem.cart_model;
            }else{
                BaseCart = null;
                console.warn("getCartItems: Get cart items error:\n");
            }
    });

    return BaseCart;
}

export async function cartCreateAct(id, quantity, price){
    let isSessionSet = 
        typeof window !== 'undefined' && localStorage.getItem('cart_session') !== null;
    let finResponse = null;

    if(id && quantity && price){
        
        let newCartItem = {
            status: "draft",
            cart_model:[
                {
                    product_id: id,
                    quantity,
                    price
                }
            ]
        }

        if(!isSessionSet){
            await setData(createCart, {data: newCartItem}).then(response=> {
                localStorage.setItem('cart_session', response.create_cartCollection_item.id);
                finResponse = response.create_cartCollection_item.id;
            })
        } else {
            
            let BaseCart = [];
            BaseCart = await getCartItems();

            if(BaseCart !== null && BaseCart.length >= 0){
                BaseCart.map(elem => {
                    newCartItem.cart_model.push(elem);
                })
            
                await setData(updateCart, {data: newCartItem, id: localStorage.getItem('cart_session')}).then(response=>{
                    finResponse = newCartItem ? newCartItem : null;
                    
                })

            }else{
                //dangerous idea
                finResponse = null;
                localStorage.removeItem('cart_session');
                return await cartCreateAct(id, quantity, price);
            }
            
        }
    }

    return finResponse;
}

export async function inCart(id){
    let isSessionSet = typeof window !== 'undefined' && localStorage.getItem('cart_session') !== null;
    let finRes = false;
    if(!isSessionSet)
        return false;
    else{
        let BaseCart = [];
        BaseCart = await getCartItems();

        if(BaseCart && BaseCart.length > 0){
            BaseCart.map(elem => {
                if(elem){
                    if(elem.product_id === id)
                    finRes = true;
                }    
                else{
                    console.warn(BaseCart, "inCart: Get cart items error");
                    finRes = false;
                }

            });

        }
        else
            finRes = false;

    }

    return finRes
}

export async function rmeoveItem(id){

    let newCartItem = {
        status: "draft",
        cart_model:[
  
        ]
    }

    await getCartItems().
    then(elem =>{
        if(elem && elem.cart_model){
            elem.cart_model.map((product, index) => {
                if(product.product_id !== id){
                    let item = {
                        id: product.product_id,
                        quantity: product.quantity,
                        price: product.price
                    }
                    newCartItem.cart_model.push(item);
                }
            })
        }
    });

    if(newCartItem){
        await setData(updateCart, {data: newCartItem, id: localStorage.getItem('cart_session')});
        return newCartItem;
    }
    else return null;
    
}