import styles from "../../styles/CartPage/CartPage.module.css"
import { useState, useEffect, useReducer} from "react"

import IST_CheckBox from "../../components/IST_CheckBox"
import CartItem from "../../components/CartPage/CartItem"
import CartTotalSum from "../../components/CartPage/CartTotalSum"

export default function CartPage({}){

    const ADD_BP = "Add";
    const REMOVE_BP = "Remove";

    const[SelectAll, setSelect] = useState(false);
    const[AllItemsList, setItemsList] = useState([]);
    

    const[selectedItems, dispatch] = useReducer(reducer, {
        ProdList: {},
        TotalQuentity: 0,
        TotalSum: 0,
    })

    function reducer(state, action){
        switch(action.type){
            case ADD_BP:
                return{

                }
            case REMOVE_BP:
                return{
                    
                }
        }
    }

    const AddItem_AG = (quentity, price, vc) =>({
        type: ADD_BP,
        quentity,
        price,
        vc
    })

    const RemoveItem_AG = (quentity, price, vc) =>({
        type: REMOVE_BP,
        quentity,
        price,
        vc
    })
    // useEffect(()=>{
    //     const prodNum = document.querySelector(`.${styles.AddedProducts}`).childElementCount;
    //     const arr = [];
    //     for(let i = 0; i < prodNum; i++){
    //         arr.push(SelectAll.toString());
    //     }
    //     setItemsList(arr);
    // },[]);  
    

    
    function SelectedListener(state, price, vc, q){
        if(state){
            dispatch(AddItem_AG(q, price, vc));
        }
        else{
            dispatch(RemoveItem_AG(q, price, vc));
        }
        // console.log(
        //     "State: ", state,
        //     "Price: ", price,
        //     "VC: ", vc,
        //     "Q: ", q,
        // )
    }


    return(
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
                                    
                                        <CartItem
                                        image={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png"}
                                        name={"Редуктор главного привода FTJ160R (TD-FT160R) правый для лебедки EC-W1 (п.ч. 49/2)"}
                                        vendCode={"000000000 "}
                                        price={"357 750"}
                                        isSelected={SelectAll}
                                        feedback={SelectedListener}
                                        />
                                        <CartItem
                                        image={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png"}
                                        name={"Редуктор главного привода FTJ160R (TD-FT160R) правый для лебедки EC-W1 (п.ч. 49/2)"}
                                        vendCode={"000000000 "}
                                        price={"357 750"}
                                        isSelected={SelectAll}
                                        />
                                        <CartItem
                                        image={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png"}
                                        name={"Редуктор главного привода FTJ160R (TD-FT160R) правый для лебедки EC-W1 (п.ч. 49/2)"}
                                        vendCode={"000000000 "}
                                        price={"357 750"}
                                        isSelected={SelectAll}
                                        />
                                        <CartItem
                                        image={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png"}
                                        name={"Редуктор главного привода FTJ160R (TD-FT160R) правый для лебедки EC-W1 (п.ч. 49/2)"}
                                        vendCode={"000000000 "}
                                        price={"357 750"}
                                        isSelected={SelectAll}
                                        />
                                        <CartItem
                                        image={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png"}
                                        name={"Редуктор главного привода FTJ160R (TD-FT160R) правый для лебедки EC-W1 (п.ч. 49/2)"}
                                        vendCode={"000000000 "}
                                        price={"357 750"}
                                        isSelected={SelectAll}
                                        />
                                        <CartItem
                                        image={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png"}
                                        name={"Редуктор главного привода FTJ160R (TD-FT160R) правый для лебедки EC-W1 (п.ч. 49/2)"}
                                        vendCode={"000000000 "}
                                        price={"357 750"}
                                        isSelected={SelectAll}
                                        />
                                  
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