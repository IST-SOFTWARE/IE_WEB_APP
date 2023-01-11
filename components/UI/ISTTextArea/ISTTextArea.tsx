import React, {CSSProperties, FC, useState} from 'react';

import styles from "./textArea.module.scss";
import common_styles from "../common.module.scss";

import {inputStyles} from "../ISTInput/ISTInput";


type textAreaStyles = Pick<CSSProperties, "maxHeight" | "minHeight">
interface ITextAreaStyles extends inputStyles, textAreaStyles {}

const defaultStyles = {
    borderRadius: "89px",
    height: "120px",
    maxHeight: "100%",
    minHeight: "50px",
} as ITextAreaStyles

interface ITextArea{
    title?: string,
    caption?: string,
    placeholder: string,

    style?: ITextAreaStyles
}

const IstTextArea:FC<ITextArea> = (
    {
        title,
        caption,
        placeholder,

        style
    }
) => {

    const[text, setText] = useState<string>(null);

    return(
        <>
            <div className={styles.area_container}>

                <div className={common_styles.title}>
                    {title}
                </div>

                <div className={common_styles.caption}>
                    {caption}
                </div>

                <textarea
                    placeholder={placeholder}
                    onChange={(e)=> setText(e.target.value)}

                    className={`${common_styles.hover_action} ${common_styles.focus_action}`}

                    style={{
                        width: "100%",

                        height: style?.height ?? defaultStyles.height,
                        minHeight: style?.minHeight ?? defaultStyles.minHeight,
                        maxHeight: style?.maxHeight ?? defaultStyles.maxHeight,

                        borderRadius: style?.borderRadius ?? defaultStyles.borderRadius
                    }}

                >
                    {text}
                </textarea>
            </div>
        </>
    )
}

export default IstTextArea;