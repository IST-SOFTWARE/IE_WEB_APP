import styles from "../styles/Gallary.module.css"
import { useState, useEffect } from "react";

export default function GallaryPoint(props){

    
    const handlerClick = () =>{
        props.SlideSwitcher(props.id);
    }

    return(
        <>
            <button
                className={`${props.id === props.activeId ? styles.GallaryPoint + " " + styles.active : styles.GallaryPoint}`}
                onClick={handlerClick}
            />
        </>
    )
}