import React, {useEffect, useState} from "react";
import DefaultLandingPage from "../../components/LandingPages/DefaultLandingPage";
import ISTCartTotalSum from "../../components/UI/ISTCartTotalSum";
import {CartWrapper} from "../../components/ProductsWrapper/cartWrapper";
import {ICartSelector_type} from "../../components/UI/ISTProductItem/Abstract/ICartTypes";
import ru from "../../locales/ru";
import en from "../../locales/en";
import {useRouter} from "next/router";

const CartPage_index = (props) => {
  // const [idPRoducts, setIdProducts] = useState<string[]>([
  //   "172",
  //   "173",
  //   "174",
  //   "175",
  // ]);
  //
  // const [cartSelector, setCartSelector] = useState<string[]>([])
  //
  //   useEffect(()=>{
  //       console.log(cartSelector);
  //   },[cartSelector])

  // const getPriceProductById = (idCollection: (number | string)[]) => {
  //   idCollection.map((id) => {
  //     const {
  //       data,
  //       error,
  //       loading = useQuery(GET_PRODUCT_BY_ID, {
  //         id: id,
  //       }),
  //     };
  //   });
  // };

  const [cartSelector, setCartSelector] = useState<ICartSelector_type[]>([])

  const [numOfSelected, setNumOfSelected] = useState<number>(0);
  const [totalSum, setTotalSum] = useState<number>(0);

  const router = useRouter();
  const t = router.locale === "ru-RU" ? ru : en;

  return (
      <>
        <div
          className={``}
          style={{
            color: "white",
          }}
        >
          <DefaultLandingPage
            landingDescription={{
              title: "",
              titleOffset: 100,
            }}
            pageId={"CartPage"}
          >
            <div className={`col-12 col-lg-7`}>
                <div style={{
                    position: "relative"
                }}>
                    <CartWrapper
                        cartID={"e0a9d860-c0f9-4b6a-ace4-04ecf56b0f0c"}

                        currency={{
                          currency: t.catalogCartPageMobileModal.currency ? "EN": "RU",
                        }}

                        cartSelector={{
                          selectedState: cartSelector,
                          setSelectedState: setCartSelector
                        }}

                        amountData={{
                          amountQuantitySetter: setNumOfSelected,
                          amountPriceSetter: setTotalSum,
                        }}

                        itemStyles={{
                            style: {
                                margin: "0 0 15px 0",
                                fill: true
                            }
                        }}

                        wrapperStyles={{
                            width: "100%",
                            maxWidth: "550px",
                        }}

                        mobileTriggerSize={"LG_992"}
                    />
                </div>

            </div>

            <div className={`col-0 d-none d-lg-block col-lg-5`}>

              {/*<ISTCartTotalSum */}
              {/*    cartSelector={idPRoducts}*/}
              {/*/>*/}

          </div>
          </DefaultLandingPage>
        </div>
      </>
  );
};

export default CartPage_index;

// import styles from "../../styles/CartPage/CartPage.module.css"
// import { useState, useEffect, useReducer, useContext, useCallback} from "react"
//
// import IST_CheckBox from "../../components/IST_CheckBox"
// import CartItem from "../../components/CartPage/CartItem"
// import CartTotalSum from "../../components/CartPage/CartTotalSum"
//
// import CatalogContext from "../../components/Context/CatalogContext"
// import { getCartItems, rmeoveItem } from "../../cartActions/cartActions"
// import ComponentLoader from "../../components/ComponentLoader"
//
//
//
// export default function CartPage({}){
//
//     const ADD_BP = "Add";
//     const REMOVE_BP = "Remove";
//     const UPDT_BP = "Update";
//     const CLEAR_BP = "clear"
//
//     const[SelectAll, setSelect] = useState(false)
//
//     const Catalog_cont = useContext(CatalogContext);
//     const[AllItemsList, setItemsList] = useState([]);
//
//     const[cartUpdater, setUpdater] = useState(false);
//
//     const[selectedItems, dispatch] = useReducer(reducer, {
//         ProdList: [],
//         TotalQuentity: 0,
//         TotalSum: 0
//     })
//
//
//     function reducer(state, action){
//         switch(action.type){
//             case ADD_BP:
//                 return{
//                     ProdList: action.payload,
//                     ...state,
//
//                 }
//             case REMOVE_BP:
//                 return {
//                     ProdList: action.payload,
//                     ...state,
//                     // TotalQuentity: action.quentity,
//                     // TotalSum: state.TotalSum - parseInt(action.price.replace(/\s+/g, ''))
//                 }
//             case UPDT_BP:
//                 return{
//                     ...state,
//                     TotalQuentity: action.q,
//                     TotalSum: action.p
//                 }
//             case CLEAR_BP:
//                 return{
//                     ProdList: [],
//                     TotalQuentity: 0,
//                     TotalSum: 0
//                 }
//         }
//     }
//
//
//     const AddItem_AG = (payload) =>({
//         type: ADD_BP,
//         payload,
//     })
//
//     const RemoveItem_AG = (payload) =>({
//         type: REMOVE_BP,
//         payload
//     })
//
//     const UpdateTotal_AG = (q, p) => ({
//         type: UPDT_BP,
//         q,p
//     })
//
//     const ClearCart_AG = () => ({
//         type: CLEAR_BP,
//     })
//
//
//
//     useEffect(()=>{
//         async function ProdLoad(){
//             const response = await getCartItems();
//             setItemsList(response);
//         }
//
//         if(!AllItemsList || AllItemsList.length !== {...AllItemsList.length}){
//             ProdLoad();
//         }
//
//     },[Catalog_cont, cartUpdater]);
//
//
//     const TotalsUpdater = useCallback(() => {
//
//         let totalQ = 0;
//         let totalPrice = 0;
//
//         if(selectedItems.ProdList.length > 0){
//             selectedItems.ProdList.map(
//                 elem=>{
//                     totalQ += elem.q;
//                     totalPrice += elem.q * parseFloat(elem.p);
//                 }
//             )
//         }
//         dispatch(UpdateTotal_AG(totalQ, totalPrice));
//
//     },[])
//
//
//     const SelectedListener = useCallback((id, q, p, s) => {
//         if(s){
//             const obj = {
//                 id,q,p
//             }
//             let memArr = selectedItems.ProdList;
//             memArr.map((elem,i) => {
//                 if(elem.id === id)
//                     memArr.splice(i, 1);
//             })
//             memArr.push(obj);
//
//             dispatch(AddItem_AG(memArr));
//             TotalsUpdater();
//         }
//         else{
//             let memArr = selectedItems.ProdList;
//             if(memArr && memArr.length > 0){
//                 memArr.map((elem, i) => {
//                     if(elem.id === id)
//                         memArr.splice(i, 1);
//                 })
//             }
//
//             dispatch(RemoveItem_AG(memArr));
//             TotalsUpdater();
//         }
//     },[])
//
//
//     const handleSelect = (state) => {
//         AllItemsList.map(elem => {
//             SelectedListener(elem.product_id, elem.quantity, elem.price, state)
//         })
//     }
//
//
//     const handleRemove = async() => {
//         if(selectedItems.ProdList.length !== 0){
//             let removeCave = Array.from(selectedItems.ProdList);
//
//             for(let i=0; i < removeCave.length; i++){
//                 // console.log(removeCave[i].id);
//                 await rmeoveItem(removeCave[i].id);
//                 SelectedListener(removeCave[i].id, 0, 0, false);
//             }
//
//         }
//         setUpdater(!cartUpdater);
//     }
//
//     useEffect(()=>{
//
//         if(AllItemsList && selectedItems && AllItemsList.length > 0)
//             if(AllItemsList.length === selectedItems.ProdList.length){
//                 // console.log(AllItemsList, selectedItems.ProdList)
//                 setSelect(true);
//             }
//             else{
//                 setSelect(false);
//             }
//
//     },[AllItemsList, selectedItems]);
//
//     useEffect(()=>{
//         const RemoveSelectedBtn = document.querySelector(`.${styles.RemoveSelectedBtn}`);
//         if(RemoveSelectedBtn && selectedItems.ProdList.length === 0)
//             RemoveSelectedBtn.classList.add(`${styles.disabled}`);
//         else if(RemoveSelectedBtn && selectedItems.ProdList.length !== 0)
//             RemoveSelectedBtn.classList.remove(`${styles.disabled}`);
//
//     },[selectedItems]);
//
//     return AllItemsList &&
//     AllItemsList.length === 0  ||
//     AllItemsList === null? (
//         <>
//             <div className="container">
//                 <div className="row ">
//                     <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-15">
//                         <div className={styles.CartPageCont}>
//                             <div className={styles.noProductsBlock}>
//                                 <p>Корзина пуста</p>
//                                 <a>Воспользуйтесь поиском, чтобы найти всё что нужно.</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     ) : (
//         <>
//             <div className={styles.CartPageCont}>
//                 <div className="container">
//                     <div className="row ">
//                         <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-15">
//                             <div className={styles.AddedProductsBlock}>
//
//                                 <div className={styles.CartActions}>
//                                     <div className={styles.SelectAllBtn}>
//                                             <div onClick={()=>handleSelect(!SelectAll)}>
//                                                 <IST_CheckBox
//                                                 state={SelectAll}>
//                                                     Выбрать всё
//                                                 </IST_CheckBox>
//                                             </div>
//                                     </div>
//
//                                     <div className={styles.RemoveSelectedBtn}>
//                                         <button onClick={()=>{
//                                             handleRemove()
//                                         }}>
//                                             Удалить выбранное
//                                         </button>
//                                     </div>
//
//                                 </div>
//
//                                 <div className={styles.AddedProducts}>
//                                     {AllItemsList ? AllItemsList.map(product=>(
//                                             <CartItem
//                                             key={product.product_id}
//                                             id={product.product_id}
//                                             quantity={product.quantity}
//
//                                             isSelected={selectedItems}
//                                             feedback={SelectedListener}
//                                             />
//                                     )) : null}
//
//
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className="col-xxl-7 col-xl-6 col-lg-6">
//
//                                 <div className={styles.FinalyDataBlock}>
//                                         <CartTotalSum
//                                         quantity={selectedItems.TotalQuentity}
//                                         price={selectedItems.TotalSum}
//                                         />
//                                 </div>
//
//                         </div>
//
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }