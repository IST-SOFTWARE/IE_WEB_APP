import { useEffect, useState } from "react";
import styles from "../../styles/ModalComponents/ProgressBar.module.css";

export default function PrPoint({size, id, active}){
    const[scale, setScale] = useState();
    const[isActive, setActive] = useState(false);

    function isActiveCheck(){
        if(active === id){
            setActive(true);
        } else{
            setActive(false);
        }
    }

    // function isNeighboring(){
    //     if((id + 1 === active)){
    //         document.querySelector(`.${styles.circle}`).style.transform = "scale(0.1)";
    //     }
    // }

    useEffect(()=>{
        isActiveCheck();
        // isNeighboring();
    },[active]);

    const returned = () => {
        return isActive ? (

            <div className={styles.fillBlock}>
                <p>0{id + 1}</p>
            </div>

            ):
            (

            <div className={styles.circle}>

            </div>

            )

    }

    return(
        <>
            <div className={styles.Point} 
            style={{height: size < 194 ? size : 194,
            width: size < 194 ? size : 194}}
            >
                {returned()}
            </div>
        </>
        );
}