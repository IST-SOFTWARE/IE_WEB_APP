import { useState, useEffect} from "react";
import styles from "../styles/IST_CheckBox.module.css"


export default function IST_CheckBox({state, label, children}){

    const[isChecked, setChecked] = useState(false);

    const CheckBoxToggle = () =>{
        setChecked(!isChecked);
    }


    useEffect(()=>{
        if(state !== undefined && typeof state === "boolean"){
            setChecked(state);
        }
    },[state])

    useEffect(()=>{
        const checkbox = document.querySelector(`.${styles.checkmark}`);
        // console.log(checkbox.checked);
        if(isChecked){
            checkbox.classList.add(`${styles.active}`);
        }
        else{
            checkbox.classList.remove(`${styles.active}`);
        }
    },[isChecked])

    return(
        <>
            <div className={styles.container}>
                <label>{children}</label>
                <div className={styles.CheckBoxContainer}>
                    <input type="checkbox"
                    className={styles.checkmark}
                    defaultChecked={isChecked}
                    onChange={(e)=>CheckBoxToggle()}/>

                    <button className={styles.Checked}
                    onClick={()=>CheckBoxToggle()}></button>
                </div>
            </div>
        </>
    )
}