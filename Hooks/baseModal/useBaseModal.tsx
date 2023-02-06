import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect, useMemo, useState} from 'react';
import {modalStater} from "./modalSetter";
import Image from "next/image";
import styles from "../../styles/Modals/popUp/puWrapper.module.scss";
import {createPortal} from "react-dom";

interface modalView{
    children?: ReactNode,
    data: modalStater,
}

type alignStyle = {
    vertical?: "end" | "start" | "center",
    horizontal?: "end" | "start" | "center",
}

interface IAlignStyle{
    alignStyle?: alignStyle;
}

export interface IBaseModalFC extends modalView, IAlignStyle{};

const useBaseModal = (
    bgContainerClass: string,
    ContainerIdForScrollBlocking?: string,
) => {

    const modalComponent = useMemo(()=>{
        return new modalStater();
    },[]);


    const ModalView:FC<IBaseModalFC> = ({
        children,
        data,
        alignStyle
     }) =>{

        const[isBrowser, setIsBrowser] = useState(false);
        const[currentData, dataUpdate] = useState<modalStater>(null);


        useEffect(()=>{
            setIsBrowser(true);
            if(data){
                data.setDataUpdater(dataUpdate);
                dataUpdate(data);
            }
        },[])

        useEffect(()=>{
            if(currentData){
                const pageBody = document.getElementById(ContainerIdForScrollBlocking);
                if(pageBody && ContainerIdForScrollBlocking)
                    if(currentData.state)
                        pageBody.style.overflow = "hidden"
                    else
                        pageBody.style.overflow = "auto"
                else if(ContainerIdForScrollBlocking && pageBody === undefined)
                    console.warn("Base modal component:\n" +
                        "The container with the ID you provided was not found")
            }
        },[currentData])


        const modal = currentData?.state ? (
            <>
                <div className={`container-fluid ${bgContainerClass}
                    d-flex justify-content-${alignStyle?.horizontal ?? "center"} align-items-${alignStyle?.vertical ?? "center"}
                `}>
                    {children}
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