import React, {FC} from 'react';
import {IISTMobileBar} from "./Abstract/I_ISTMobileBar";
import styles from "./ISTMobileBar.module.scss";
import Image from "next/image";

const ISTMobileBar:FC<IISTMobileBar> = ({
    buttons,
    style,
    mobileTriggerSize
}) => {

    return(
        <div
            className={`${styles.mobileBar} ${styles[mobileTriggerSize]}`}
            style={{
                minHeight: "95px",
                ...style
            }}
        >
            {buttons && buttons.length > 0 ? buttons.map((el, i)=>{
                return i <= 3 ? (
                    <div
                        className={`${styles.mobileBtn} ${el.isActive ? styles.active : ""}`}
                        style={{
                            width: `calc((100% / ${buttons.length}) + 14px)`,
                        }}
                        onClick={el.action}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={el.image}
                                alt={el.title}
                                sizes={"30px"}
                                fill={true}
                                style={{
                                    objectPosition: "center",
                                    objectFit: "contain"
                                }}
                            />
                        </div>

                        <div className={styles.titleWrapper}>
                            {el.title}
                        </div>

                    </div>
                ) : null
            }) : null}
        </div>
    )

}

export default ISTMobileBar;