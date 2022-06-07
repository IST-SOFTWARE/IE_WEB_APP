import { useQuery, useMutation } from "react-query";
import setData from "../helpers/setData";
import { createCart, updateCart, getCart} from "../queries/cartMoves";
import getData from "../queries/getData";

export async function cartCreateAct(id, quantity, price){
    let isSessionSet = typeof window !== 'undefined' && localStorage.getItem('cart_session') !== null;
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
            await getData(getCart, 'cartCollection_by_id', {id: localStorage.getItem('cart_session')}).
            then(elem =>{
                if(elem){
                    BaseCart = elem.cart_model;
                }else{
                    BaseCart= [];
                    console.error("Get cart items error");
                }
            });
            
            if(BaseCart && BaseCart.length > 0){
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
    let finResponse = false;
    if(!isSessionSet)
        return false;
    
    else{
        let BaseCart = [];
        await getData(getCart, 'cartCollection_by_id', {id: localStorage.getItem('cart_session')}).
        then(elem =>{
            if(elem && elem.cart_model){
                elem.cart_model.map(product => {
                    if(product.product_id === id){
                        finResponse = true;
                    }
                })
                
            }else{
                BaseCart = [];
                console.error("Get cart items error");
                finResponse = false;
            }
        });
        return finResponse;
    }
}

export function cartUpdateAct(quantity, id, price){

}