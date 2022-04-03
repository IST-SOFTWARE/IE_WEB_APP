import { useState, useEffect } from "react"
import Link from 'next/link'
import styles from "../../styles/Header.module.css"

export default function Cart({cartTitle, href}){

    const[defLink, setLink] = useState("./cart");

    useEffect(()=>{
        if(href !== undefined && href !== defLink){
            setLink(href)
        }
        
    },[href])

    return(
        <>
            <Link href={defLink}>
            <button className={styles.cartAndLoginBlock}>
                <img src="./Cart_ico.png" alt="Cart" width="42px" height="42px"/>
                <a>{cartTitle}</a>
            </button>
            </Link>
        </>
    )
}
