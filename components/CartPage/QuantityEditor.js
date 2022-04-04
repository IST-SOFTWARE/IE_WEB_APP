import styles from "../../styles/CartPage/QuantityEditor.module.css"
import { useEffect, useState } from "react"

export default function QuantityEditor({defQ}){
    return(
        <>
            <div className={styles.QuantityEditor}>
                <div className={styles.ActionsContainer}>
                    <button className={styles.lButton}>-</button>
                    <label>1</label>
                    <button className={styles.rButton}>+</button>
                </div>
            </div>
        </>
    )
}