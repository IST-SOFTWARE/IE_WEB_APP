import React, {FC, useState} from 'react';
import {IST_IFiltersWrapper} from "../common";
import styles from "../styles/filtersWrapper.module.scss"
import adaptiveStyles from "../styles/filtersWrapperAdaptive.module.scss";

const ISTFiltersWrapper:FC<IST_IFiltersWrapper> = ({
    title,
    isOpened,
    mobileSettings,
    children,
    hasActives
}) => {

    const [openState, setOpenState] = useState<boolean>(isOpened);

    const switchOpenState = () => {
        setOpenState(!openState);
    }

    return(
        <>
            <div className={`
              ${styles.container} 
              ${mobileSettings?.type === "transfer" ?
                adaptiveStyles[
                    mobileSettings?.mobileSizeTrigger ?
                    mobileSettings?.mobileSizeTrigger :
                    "SM_576"
                ]
                : ""}`
            }>
                {hasActives ?
                    <div className={styles.dot}/>
                    : null
                }
                <div
                    className={`${styles.title}  
                     ${hasActives ?
                        styles.titleTransition
                        : ""}`}
                    onClick={switchOpenState}>
                    {title}
                    <div
                        className={`
                        ${adaptiveStyles.vector}
                        ${styles.vector} 
                        ${openState ? styles.active : ""}`}
                    />
                </div>
                    <div className={`${styles.ch_wrapper} ${openState ? styles.active : ""}`}>
                        {children}
                    </div>
            </div>
        </>
    )
}

export default ISTFiltersWrapper;