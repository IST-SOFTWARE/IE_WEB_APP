import React, {CSSProperties, Dispatch, FC, ReactNode, SetStateAction, useEffect, useMemo, useState} from 'react';
import {modalStater} from "./modalSetter";
import {createPortal} from "react-dom";
import {Property} from "csstype";
import ZIndex = Property.ZIndex;

interface modalView{
    children?: ReactNode,
    data: modalStater,
}

type alignStyle = {
    vertical?: "end" | "start" | "center",
    horizontal?: "end" | "start" | "center",
}

type styles = Pick<CSSProperties, "zIndex">

interface IAlignStyle{
    alignStyle?: alignStyle,
    style?: styles,

}

export interface IBaseModalFC extends modalView, IAlignStyle{};

const useBaseModal = (
    ContainerIdForScrollBlocking?: string,
) => {

    const modalComponent = useMemo(()=>{
        return new modalStater();
    },[]);


    const ModalView:FC<IBaseModalFC> = ({
        children,
        data,
        alignStyle,
        style
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
                    if(currentData.getState)
                        pageBody.style.overflow = "hidden"
                    else
                        pageBody.style.overflow = "auto"
                else if(ContainerIdForScrollBlocking && pageBody === undefined)
                    console.warn("Base modal component:\n" +
                        "The container with the ID you provided was not found")
            }
        },[currentData])


        const modal = currentData?.getState ? (
            <>
                <div className={`container-fluid
                    d-flex justify-content-${alignStyle?.horizontal ?? "center"} align-items-${alignStyle?.vertical ?? "center"}
                `}
                     style={{
                         minHeight: "100%",
                         height: "100%",
                         minWidth: "100vw",
                         position: "fixed",
                         zIndex: style?.zIndex ? style.zIndex : 10
                     }}
                >
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