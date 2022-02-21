import { useEffect, useState, useCallback } from "react";
import styles from "../../styles/ModalComponents/ProgressBar.module.css";

export default function PrPoint({size, id, active, scroll}){
    const[scale, setScale] = useState();
    const[isActive, setActive] = useState(false);

    function isActiveCheck(){
        if(active === id){
            setActive(true);
        } else{
            setActive(false);
        }
    }

    function isNeighboring(){
        if((id + 1 === active) || (id - 1 === active)){
            setScale("1.3");
        }
        else if((id + 2 === active) || (id - 2 === active)){
            setScale("1.15");
        }
        else {
            setScale("1");
        }
    }

    const handlerClick = () =>{
        // console.log("scsdcsdc");
        window.scrollTo({
            top: (scroll * (document.documentElement.scrollHeight -
                document.documentElement.clientHeight))/100,
            behavior: "smooth"
        });
    };

    useEffect(()=>{
        isActiveCheck();
        isNeighboring();
    },[active]);

    const returned = () => {
        return isActive ? (

            <div className={styles.fillBlock}>
                <p>0{id + 1}</p>
            </div>

            ):
            (

            <div className={styles.circle}
            style={{transform: `scale(${scale})`}}
            onClick={()=>handlerClick()}>

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