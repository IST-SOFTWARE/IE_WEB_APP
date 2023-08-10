import React, {FC, useEffect, useRef, useState} from "react";
import styles from "../../styles/LandingStyles/mainLabel.module.scss"
import {IMainLabel} from "./ILandingLabel";


const MainLabel:FC<IMainLabel> = (
    {
        padding,
        title
    }) => {

    const titleContent = useRef<HTMLHeadingElement>(null);

    useEffect(()=>{
        if(titleContent.current){
            titleContent.current.innerHTML =
                title;
        }
    },[titleContent])

    return (
        <>
            <div  style={{marginTop: padding}} className={styles.MainLabel}>
                <h1 ref={titleContent}/>
            </div>

        </>
    )
};

export default MainLabel;



