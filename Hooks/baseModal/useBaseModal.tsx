import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect, useState} from 'react';
import {modalStater} from "./modalSetter";
import Image from "next/image";
import styles from "../../styles/DefaultModals/baseModal.module.scss";
import {createPortal} from "react-dom";

interface modalView{
    children?: ReactNode,
    border: boolean,
    data: modalStater,
}

interface modalBuiltInAction{
    currentStateSetter?: Dispatch<boolean>
}

export interface IBaseModalFC extends modalView, modalBuiltInAction {};

const useBaseModal = () => {

    const modalComponent = new modalStater();
    const ModalView:FC<IBaseModalFC> = ({
         children,
         border,
         data,
        currentStateSetter
     }) =>{

        const[isBrowser, setIsBrowser] = useState(false);
        const[nData, dataUpdate] = useState<modalStater>(null);


        useEffect(()=>{
            setIsBrowser(true);
            if(data){
                data.setDataUpdater(dataUpdate);
                dataUpdate(data);
            }
        },[])

        const modal = modalComponent.state ? (
            <>
                <div className={`container-fluid ${styles.baseModalContainer}
                d-flex justify-content-center align-items-center
            `}>
                    <div className={`${styles.modalBase} ${border ? styles.wb_style : ""}`}>
                        <div className={styles.modalHeader}>
                            <h1>{nData?.header}</h1>
                            <p>{nData?.paragraph}</p>

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
                            {nData?.childrenState === false ?
                                null : children}
                        </div>
                    </div>
                </div>
            </>
        ) : null

        return isBrowser ? createPortal(modal,
            document.getElementById("PopUpBase"))
            : null;
    }


    return{
        modalComponent,
        ModalView
    }
}

export default useBaseModal;