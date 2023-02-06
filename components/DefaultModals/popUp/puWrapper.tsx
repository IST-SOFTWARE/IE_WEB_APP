import React, {FC} from 'react';
import styles from "../../../styles/Modals/popUp/puWrapper.module.scss";
import Image from "next/image";
import {modalStater} from "../../../Hooks/baseModal/modalSetter";

interface puWrapper{
    data: modalStater,
    border: boolean,
    children: React.ReactNode
}

const PuWrapper:FC<puWrapper> = (
    {
        data,
        border,
        children
    }
) =>{
    return(
        <>
            <div className={`${styles.modalBase} ${border ? styles.wb_style : ""}`}>
                <div className={styles.modalHeader}>
                    <h1>{data?.header}</h1>
                    <p>{data?.paragraph}</p>

                    <button onClick={() => {
                        data.switch(false)
                    }
                    }>
                        <Image
                            src={"/PU_closer.svg"}
                            alt={"Closer"}
                            fill={true}
                            style={{
                                objectFit:"contain",
                                objectPosition: "center",
                            }}
                        />
                    </button>
                </div>

                <div>
                    {data.childrenState === false ?
                        null : children}
                </div>
            </div>
        </>
    )
}

export default PuWrapper;