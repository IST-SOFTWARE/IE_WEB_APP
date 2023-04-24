import styles from "./index.module.scss"
import {Dispatch, FC, useCallback, ReactNode} from "react";

interface IProductSelector{
    state: boolean,
    stateSetter: Dispatch<boolean>,
    children?: ReactNode
}

export const ProductItemSelector:FC<IProductSelector> = ({
    state,
    stateSetter,
    children}
) => {

    const HandlerClick = useCallback(() => {
        stateSetter(!state);
    },[stateSetter, state])

    return(
        <>
            <div className={styles.container}>
                <label>{children}</label>
                <div className={styles.CheckBoxContainer}>
                    <input type="checkbox"
                    className={`${styles.checkmark} ${state ? styles.active : ""}`}
                    defaultChecked={state}
                    onClick={()=>HandlerClick()}/>
                </div>
            </div>
        </>
    )
}