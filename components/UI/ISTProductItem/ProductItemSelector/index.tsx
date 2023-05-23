import styles from "./index.module.scss"
import {Dispatch, FC, useCallback, ReactNode} from "react";


interface IProductSelector{
    state: boolean,
    onSelect: (...props: any) => any;
    children?: ReactNode
}

export const ProductItemSelector:FC<IProductSelector> = ({
    state,
    onSelect,
    children
}
) => {

    return(
        <>
            <div className={styles.container}>
                <label>{children}</label>
                <div className={styles.CheckBoxContainer}>
                    <input type="checkbox"
                    className={`${styles.checkmark} ${state ? styles.active : ""}`}
                    defaultChecked={state}
                    onClick={onSelect}/>
                </div>
            </div>
        </>
    )
}