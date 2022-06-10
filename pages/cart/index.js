import styles from "../../styles/CartPage/CartPage.module.css"
import { useState, useEffect, useReducer, useContext} from "react"

import IST_CheckBox from "../../components/IST_CheckBox"
import CartItem from "../../components/CartPage/CartItem"
import CartTotalSum from "../../components/CartPage/CartTotalSum"

import CatalogContext from "../../components/Context/CatalogContext"
import { getCartItems } from "../../cartActions/cartActions"
import ComponentLoader from "../../components/ComponentLoader"


export default function CartPage({}){

    const ADD_BP = "Add";
    const REMOVE_BP = "Remove";

    const[SelectAll, setSelect] = useState(null)

    const Catalog_cont = useContext(CatalogContext);
    const[AllItemsList, setItemsList] = useState();
    
    const[selectedItems, dispatch] = useReducer(reducer, {
        ProdList: [],
        TotalQuentity: 0,
        TotalSum: 0
    })

    useEffect(()=>{
        async function ProdLoad(){
            const response = await getCartItems();
            setItemsList(response);
        }

        if(!AllItemsList || AllItemsList.length !== {...AllItemsList.length}){
            ProdLoad();
        }

    },[Catalog_cont]);

    function reducer(state, action){
        switch(action.type){
            case ADD_BP:
                return{
                    TotalQuentity: action.quentity,
                    TotalSum: state.TotalSum + parseInt(action.price.replace(/\s+/g, ''))
                }
            case REMOVE_BP:
                return {
                    ...state,
                    TotalQuentity: action.quentity,
                    TotalSum: state.TotalSum - parseInt(action.price.replace(/\s+/g, ''))
                }
        }
    }


    const AddItem_AG = (quentity, price, id) =>({
        type: ADD_BP,
        quentity,
        price,
        id
    })

    const RemoveItem_AG = (quentity, price, id) =>({
        type: REMOVE_BP,
        quentity,
        price,
        id
    })



    useEffect(()=>{
        // const prodNum = document.querySelector(`.${styles.AddedProducts}`).childElementCount;
        // const arr = [];
        // for(let i = 0; i < prodNum; i++){
        //     arr.push(SelectAll.toString());
        // }
        // setItemsList(arr);
        console.log(selectedItems, 1);
    },[selectedItems]);  
    


    
    function SelectedListener(operation, price, id, q){
        if(price && id && q){
            switch(operation){
                case "sum":{
                    dispatch(AddItem_AG(selectedItems.TotalQuentity + q, price, id))
                    console.log("SUM");
                }
                case "sub":{
                    dispatch(RemoveItem_AG(selectedItems.TotalQuentity - q, price, id))
                }
            }
        }

        // if(state && price && id && q){
        //     dispatch(AddItem_AG(q, price, id));
        // }
        // else if(!state && price && id && q){
        //     dispatch(RemoveItem_AG(q, price, id));
        // }
    }


    return AllItemsList && AllItemsList.length === 0 ? (
        <>
            <div className="container">
                <div className="row ">
                    <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-15">
                        <div className={styles.CartPageCont}>
                            <div className={styles.noProductsBlock}>
                                <p>Корзина пуста</p>
                                <a>Воспользуйтесь поиском, чтобы найти всё что нужно.</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
            <div className={styles.CartPageCont}>
                <div className="container">
                    <div className="row ">
                        <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-15">
                            <div className={styles.AddedProductsBlock}>
                                
                                <div className={styles.CartActions}>
                                    <div className={styles.SelectAllBtn}>
                                            <div onClick={()=>setSelect(!SelectAll)}>
                                                <IST_CheckBox
                                                state={SelectAll}>
                                                    Выбрать всё
                                                </IST_CheckBox>
                                            </div>
                                    </div>

                                    <div className={styles.RemoveSelectedBtn}>
                                        <button>Удалить выбранное</button>
                                    </div>

                                </div>
                                
                                <div className={styles.AddedProducts}>
                                    {AllItemsList ? AllItemsList.map(product=>(
                                            <CartItem
                                            key={product.product_id}
                                            id={product.product_id}
                                            price={product.price}
                                            isSelected={SelectAll}
                                            feedback={SelectedListener}
                                            />
                                    )) : null}

                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-7 col-xl-6 col-lg-6">
                                    
                                <div className={styles.FinalyDataBlock}>
                                        <CartTotalSum/>
                                </div>
                                   
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}