import React, {FC, useEffect, useMemo} from 'react';
import styles from "../../../styles/Modals/popUp/puWrapper.module.scss";
import Image from "next/image";
import {modalStater} from "../../../Hooks/useBaseModal/modalSetter";

interface puWrapper{
    data: modalStater,
    children: React.ReactNode
}

const PuWrapper:FC<puWrapper> = (
    {
        data,
        children
    }
) =>{

    return(
        useMemo(()=>{
            return(
                <>
                    <div className={styles.default_pu_bg}/>
                    <div className={`${styles.modalBase}`}>
                        <div className={styles.modalHeader}>
                            <h1>{data?.getHeader}</h1>
                            <p>{data?.getParagraph}</p>
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
                            {data.getState === false ?
                                null : children}
                        </div>
                    </div>
                </>
            )
        },[])

    )
}

export default PuWrapper;