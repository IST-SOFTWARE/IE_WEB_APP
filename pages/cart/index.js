import styles from "../../styles/CartPage/CartPage.module.css"

import IST_CheckBox from "../../components/IST_CheckBox"
import CartItem from "../../components/CartPage/CartItem"

export default function CartPage({}){
    return(
        <>
            <div className={styles.CartPageCont}>
                <div className="container">
                    <div className="row ">
                        <div className="col-xxl-8">
                            <div className={styles.AddedProductsBlock}>
                                
                                <div className={styles.CartActions}>
                                    <div className={styles.SelectAllBtn}>
                                            
                                            <IST_CheckBox>
                                                Выбрать всё
                                            </IST_CheckBox>
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
                                        />
                                        <CartItem
                                        image={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1648111066/ProductsImages/reductor-glav-priv_y6ujmg.png"}
                                        name={"Редуктор главного привода FTJ160R (TD-FT160R) правый для лебедки EC-W1 (п.ч. 49/2)"}
                                        vendCode={"000000000 "}
                                        price={"357 750"}
                                        />
                                  
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-7">
                            <div className={styles.CartData}>
                                <div className={styles.header}>
                                    <h1>Ваша Корзина</h1>
                                    <label>15</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}