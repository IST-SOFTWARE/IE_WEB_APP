import React, {CSSProperties, FC, useEffect, useRef, useState} from 'react';
import {commonStyles} from "../common";

import styles from "./button.module.scss"
import common_styles from "../common.module.scss"
import Image from "next/image";

export enum direction {
    ltr = "ltr",
    rtl = "rtl"
}

export interface lightTheme{
    fill: boolean,
    style: commonStyles
}

export interface darkTheme{
    style: commonStyles,
    solid: boolean,
}

const defaultStyles = {
    fill: true,
    style: {
        borderRadius: "28px",
        height: "55px",
    }
} as lightTheme;

interface btnSelfTheme{
    title?: string,
    image?: string,
    direction?: direction,

    light?: lightTheme | undefined,
    dark?: darkTheme | undefined
}


const IstButtonN:FC<btnSelfTheme> = (
    {
        title,
        image,
        direction,

        light,
        dark
    }
) => {

    const[darkTh, setDarkTh] = useState<darkTheme>(null);
    const[lightTh, setLightTh] = useState<lightTheme>(null);

    const btnRef = useRef<HTMLButtonElement>(null);

    const setStyles = (theme: darkTheme | lightTheme) => {
        btnRef.current.style.minHeight = theme.style.height.toString();
        btnRef.current.style.borderRadius = theme.style.borderRadius.toString();
    }

    useEffect(()=>{
        if(light)
            setLightTh(light);
        else if(dark)
            setDarkTh(dark);
        else{
            console.warn(`Standard types have been set for the \"${title ?? "No name"}\" button`);
            setLightTh(defaultStyles);
        }
    },[light, dark])

    useEffect(()=>{
        if(lightTh){
            btnRef.current.classList.add(styles.light_th);

            lightTh.fill ?
                btnRef.current.classList.add(
                    styles.fill,
                    styles.lf_actions
                ) :
                btnRef.current.classList.add(
                    common_styles.hover_action,
                    common_styles.focus_action
                )
            setStyles(lightTh);
        }
    },[lightTh])

    useEffect(()=>{
        if(darkTh){
            btnRef.current.classList.add(`${styles.dark_th}`);
            setStyles(darkTh);
        }
    },[darkTh])

    useEffect(()=>{

        const btnHeight = btnRef.current?.offsetHeight;
        const themeStyle: CSSProperties =
            darkTh ? darkTh.style : lightTh ? lightTh.style : null;



        console.log(themeStyle.height);

    },[title, btnRef, darkTh, lightTh])

    return(
        <>
            <button
                className={styles.btn}
                ref={btnRef}
            >
                <div className={styles.btn_img}>
                    {/*<Image*/}
                    {/*    src={}*/}
                    {/*    alt={}*/}
                    {/*/>*/}
                </div>
                <div className={styles.btn_title}>
                    titletitlet itletitl etitletitle
                </div>
            </button>
        </>
    )
}

export default IstButtonN;