import React, {FC, ReactNode, useEffect, useState} from 'react';
import {modalStater} from "./modalSetter";
import Image from "next/image";
import styles from "../../styles/DefaultModals/nodes/feedBackModal.module.scss";
import {createPortal} from "react-dom";
import {modalView} from "./useBaseModal";
import {JSXElement} from "@typescript-eslint/types/dist/generated/ast-spec";

const useFeedBackModal = () => {

    const modalComponent = new modalStater();

    const ModalView:FC<modalView> = ({
                                         children,
                                         border,
                                         data
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
                <div className={`container-fluid ${styles.feedback_container}
                d-flex justify-content-center align-items-end
            `}>
                    <div className={styles.feedback_data_wrapper}>
                        <div className={styles.feedback_data}>
                            <div className={styles.feedback_data_header}>
                                <div className={styles.feedback_title}>
                                    All reviews
                                </div>
                            </div>

                            <div className={styles.feedback_comments}>
                                kllkjkljkljkllj
                            </div>

                            <div className={styles.feedback_more_comments}>

                            </div>
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

export default useFeedBackModal;