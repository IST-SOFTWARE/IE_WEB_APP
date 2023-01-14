import React, {CSSProperties, FC, HTMLAttributes, useEffect, useRef, useState} from 'react';
import {commonStyles} from "../common";

import styles from "./button.module.scss"
import common_styles from "../scss/common.module.scss"
import Image from "next/image";

export enum direction {
    ltr = "ltr",
    rtl = "rtl"
}

type btnWidth = {fillContainer?: boolean}
interface btnStyles extends commonStyles, btnWidth {}

interface lightTheme{
    fill: boolean,
    style: btnStyles,
}

interface darkTheme{
    solid: boolean,
    style: btnStyles,
}

interface ITitle{
    id?: string,
    caption: string,
}

interface IImage{
    id?: string,
    src: string,
}

const defaultStyles = {
    fill: true,
    style: {
        borderRadius: "28px",
        height: "55px",
    }
} as lightTheme;

interface btnSelfTheme{
    title?: ITitle,
    image?: IImage,
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


    const[theme, setTheme] = useState<lightTheme | darkTheme>(null);
    const[bHeight, setBHeight] = useState<number | string>(10);

    const btnRef = useRef<HTMLButtonElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);


    const setStyles = (theme: darkTheme | lightTheme) => {
        if(theme?.style) {
            if(theme.style.height){
                btnRef.current.style.maxHeight = theme.style.height.toString();
                setBHeight(theme.style.height);
            }
            else {
                btnRef.current.style.maxHeight = "100%";
                setBHeight(btnRef.current.offsetHeight * 0.8);
            }

            if(theme.style.fillContainer) {
                btnRef.current.style.width = "100%";
                btnRef.current.style.height = "100%";
            }

            else
                btnRef.current.style.width = "fit-content";



            btnRef.current.style.borderRadius =
                theme.style.borderRadius ?
                    theme.style.borderRadius.toString() : "0px";
        }

    }

    function isLightTheme(object: any): object is lightTheme {
        return 'fill' in object;
    }

    function isDarkTheme(object: any): object is darkTheme {
        return 'solid' in object;
    }


    useEffect(()=>{
        if(light)
            setTheme(light)
            // setLightTh(light);
        else if(dark)
            setTheme(dark);
            // setDarkTh(dark);
        else{
            console.warn(`Standard types have been set for the \"${title ?? "No name"}\" button`);
            setTheme(defaultStyles);
            // setLightTh(defaultStyles);
        }
    },[light, dark])


    useEffect(()=>{
        if(theme && isLightTheme(theme)){
            btnRef.current.classList.add(styles.light_th);

            theme.fill ?
                btnRef.current.classList.add(
                    styles.fill,
                    styles.lf_actions
                ) :
                btnRef.current.classList.add(
                    common_styles.hover_action,
                    common_styles.focus_action
                )
            setStyles(theme);
        }
    },[theme])

    useEffect(()=>{
        if(theme && isDarkTheme(theme)){
            btnRef.current.classList.add(styles.dark_th)
            theme.solid ?
                btnRef.current.classList.add(
                    styles.dt_solid,
                    styles.ds_actions
                )
                : null
                btnRef.current.classList.add(`${styles.dark_th}`)

            setStyles(theme);
        }
    },[theme])

    return(
        <>
            <button
                className={styles.btn}
                ref={btnRef}
            >

                {image ?
                    <div className={styles.img_btn}
                         id={image?.id}
                         style={{
                             maxHeight: "100%",
                             minWidth: !theme?.style?.fillContainer ? bHeight : "unset",
                         }}
                    >
                        <Image
                            src={image?.src}
                            alt={`button_${title?.caption}`}
                            fill={true}
                            style={{
                                objectFit: "contain",
                                objectPosition: "center",
                                padding: '10px'
                            }}
                        />
                    </div>: null
                }


                <div className={styles.btn_title}
                     id={title?.id}
                     ref={titleRef}
                     style={{
                         flexGrow: !title ? 0 : 1
                     }}
                >
                    {title?.caption}
                </div>

            </button>
        </>
    )
}

export default IstButtonN;