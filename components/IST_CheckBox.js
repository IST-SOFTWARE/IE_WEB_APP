import styles from "../styles/IST_CheckBox.module.css"

import { useState, useEffect, useContext} from "react";


export default function IST_CheckBox({state, feedback, children}){

    const[isChecked, setChecked] = useState(false);
    const[classChecked, setClassChecked] = useState(isChecked ? 
        `${styles.active}` : ``)

    // useEffect(()=>{
    //     feedback = state;
    // },[])

    const HandlerClick = () => {
        setChecked(!isChecked);
        if(feedback !== undefined){
            feedback(!isChecked);
        }
    }

    useEffect(()=>{
        setChecked(state);
    },[state])

    useEffect(()=>{
        isChecked ? 
        setClassChecked(`${styles.active}`) : setClassChecked("");
    },[isChecked])


    return(
        <>
            <div className={styles.container}>
                <label>{children}</label>
                <div className={styles.CheckBoxContainer}>
                    <input type="checkbox"
                    className={styles.checkmark + " " + classChecked}
                    defaultChecked={isChecked}
                    onClick={()=>HandlerClick()}/>
{/*                   
                    <button className={styles.Checked}
                    onClick={()=>CheckBoxToggle()}></button> */}
                </div>
            </div>
        </>
    )
}