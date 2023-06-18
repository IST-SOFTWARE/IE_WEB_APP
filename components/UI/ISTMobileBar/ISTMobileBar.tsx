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
                minHeight: "90px",
                ...style
            }}
        >
            {buttons && buttons.length > 0 ? buttons.map((el, i)=>{
                return i <= 3 ? (
                    <div
                        className={`${styles.mobileBtn} ${el.isActive ? styles.active : ""}`}
                        style={{
                            width: `calc((100% - 14px - (${(buttons.length * 2 - 2) * 5}px)) / ${buttons.length})`,
                            maxWidth: `calc((100% - 14px - (${(buttons.length * 2 - 2) * 5}px)) / ${buttons.length})`,
                            minWidth: `calc((100% - 14px - (${(buttons.length * 2 - 2) * 5}px)) / ${buttons.length})`
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