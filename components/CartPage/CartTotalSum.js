import styles from "../../styles/CartPage/CartPage.module.css"
import { useState, useEffect} from "react"

export default function CartTotalSum(){

    const[MoreInfActive, setActive] = useState(false);

    const handlerClick = (e, state) =>{
        setActive(!MoreInfActive);
        if(!state){
            e.target.classList.add(`${styles.active}`);
        }
        else if(state && e.target.classList.contains(`${styles.active}`)){
            e.target.classList.remove(`${styles.active}`);
        }
    }

    useEffect(()=>{
        const moreActivator = document.querySelector(`.${styles.totalDescription}`);
        if(MoreInfActive){
            moreActivator.classList.add(`${styles.active}`);
        }
        else{
            moreActivator.classList.remove(`${styles.active}`);
        }

    }, [MoreInfActive])

    return(
        <>
            <div className={styles.CartData}>
                <div className={styles.header}>
                        <h1>Ваша Корзина</h1>
                        <label>15</label>
                        <button className={styles.MoreAboutOrder}
                            onClick={(e)=>handlerClick(e, MoreInfActive)}
                        />
                </div>
                
                <div className={styles.TotalSum}>
                    <div className={styles.totalDescription}>  
                        <div className={
                            styles.TotalCol + " " +
                            styles.TotalProducts}>
                            <a>Товары(15):</a>
                            <a>1 431 000₽</a>
                        </div>
                        <div className={
                            styles.TotalCol + " " +
                            styles.TotalDiscount}>
                            <a>Скидка:</a>
                            <a>10 845₽</a>
                        </div>
           
                    </div>
                    <div className={styles.TotalFinalyBlock}>
                        <p className={styles.TotalSum_FinSum}>Сумма: 1 420 155₽</p>

                        <button className={styles.SendOrderBtn}>
                            Оформить заказ
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}