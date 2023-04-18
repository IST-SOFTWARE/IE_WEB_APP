import React, {FC, useCallback, useState} from 'react';
import {IST_IFiltersWrapper, mobileOpenType_dropdown, mobileOpenType_transfer} from "../common";
import styles from "../styles/filtersWrapper.module.scss"
import adaptiveStyles from "../styles/filtersWrapperAdaptive.module.scss";

const ISTFiltersWrapper:FC<IST_IFiltersWrapper> = ({
    title,
    isOpened,
    children,
    hasActives,
    mobileSettings,
}) => {

    const [openState, setOpenState] = useState<boolean>(isOpened);

    const switchOpenState = () => {
        setOpenState(!openState);
    }


    const filterClickHandler = useCallback(() => {
        if(mobileSettings.onTransfer && mobileSettings.type === "transfer")
            mobileSettings.onTransfer()

        else if(!mobileSettings.onTransfer && mobileSettings.type === "transfer")
            throw new Error("When selecting the \"transfer\" type, you must specify the \"onTransfer\" function")

        else
            switchOpenState()
    },[mobileSettings, switchOpenState])

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
                    >

                        <div className={`${adaptiveStyles.titleHandlerBlock} 
                            ${adaptiveStyles[`mobile_transfer_${
                                mobileSettings?.mobileSizeTrigger ?
                                mobileSettings?.mobileSizeTrigger : 
                                "SM_576"
                            }`]} 
                            ${adaptiveStyles.mobile_transfer}`}
                        />

                        <div className={`${adaptiveStyles.titleHandlerBlock}
                             ${adaptiveStyles[`default_handler_${
                                mobileSettings?.mobileSizeTrigger ?
                                    mobileSettings?.mobileSizeTrigger :
                                    "SM_576"
                            }`]} 
                            ${adaptiveStyles.default_handler} 
                        `}/>

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