import styles from "../../styles/Header.module.css"

export default function Cart({cartTitle}){
    return(
        <>
            <button className={styles.cartAndLoginBlock}>
                <img src="./Cart_ico.png" alt="Cart" width="42px" height="42px"/>
                <a>{cartTitle}</a>
            </button>
        </>
    )
}
