import React, {
    CSSProperties,
    FC,
    ReactNode, useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import {modalStater} from "./modalSetter";
import {createPortal} from "react-dom";

interface modalView {
    children?: ReactNode,
    data?: modalStater,
    currentData?: any
}

type alignStyle = {
    vertical?: "end" | "start" | "center",
    horizontal?: "end" | "start" | "center",
}

type styles = Pick<CSSProperties, "zIndex" | "height" | "width" | "minHeight" | "minWidth" | "position" | "top" | "left" | "bottom" | "right">

interface IAlignStyle {
    alignStyle?: alignStyle,
    style?: styles,
}

export interface IBaseModalFC
    extends modalView, IAlignStyle {
};

const useBaseModal = (
    ContainerIdForScrollBlocking?: string,
    TransferBlockId?: string,
) => {

    const [currentData, dataUpdate] =
        useState<modalStater>(null);

    const modalComponent = useMemo(() => {
        const newModal = new modalStater();
        newModal.setDataUpdater(dataUpdate);
        return newModal;
    }, []);


    useEffect(() => {
        if (currentData) {
            const pageBody = document.getElementById(ContainerIdForScrollBlocking);
            if (pageBody && ContainerIdForScrollBlocking)
                if (currentData.getState)
                    pageBody.style.overflow = "hidden"
                else
                    pageBody.style.overflow = "auto"

            else if (ContainerIdForScrollBlocking && pageBody === undefined)
                console.warn("Base modal component:\n" +
                    "The container with the ID you provided was not found")
        }
    }, [currentData])

    const portalSender = useCallback((modal: React.ReactNode) => {
        if (currentData)
            return createPortal(currentData.getState ? modal : null,
                document.getElementById(TransferBlockId ? TransferBlockId : "PopUpBase"))

    }, [currentData])

    const ModalView: FC<IBaseModalFC> = ({
     children,
     data,
     alignStyle,
     style
 }) => {

        const modal = useMemo(() => {
            return (
                <>
                    <div style={{
                        minWidth: style?.minWidth ? style?.minWidth : "100vw",
                        width: style?.width ? style?.width : "unset",

                        minHeight: style?.minHeight ? style?.minHeight : "100%",
                        height: style?.height ? style?.height : "100%",

                        position: style?.position ? style?.position : "fixed",
                        zIndex: style?.zIndex ? style.zIndex : 10,

                        justifyContent: alignStyle?.horizontal ? alignStyle?.horizontal : "center",

                        alignItems: alignStyle?.vertical ? alignStyle?.vertical : "center",

                        display: "flex",
                        ...style
                    }}
                    >
                        {children}
                    </div>
                </>
            )
        }, [currentData])

        return currentData?.getState ? portalSender(modal) : null
    }

    return {
        modalComponent,
        ModalView,
    }
}

export default useBaseModal;