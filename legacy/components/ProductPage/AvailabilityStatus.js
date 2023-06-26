import { useEffect, useState, useRef} from "react";
import styles from "./availabilityStatus.module.scss";

export default function AvailabilityStatus({status, value}){
    let ref = useRef();
    const[textValue, setText] = useState("Уточните по телефону");
    
    // -1 not Available
    // 0 Check by phone
    // 1 is Available
    
    useEffect(()=>{
        const el = ref.current;
        
        if(status && el){
            el.className = `${styles.AvailabilityStatus}`

            if(status === -1){
                setText("Нет в наличии");
                el.classList.add(`${styles.notAvailable}`);
            }
            else if(status === 1){
                setText("Есть в наличии");
                el.classList.add(`${styles.Available}`);
            }
            
        }
    },[])

    return(
        <>
            <div className={styles.AvailabilityStatus} ref={ref}>
                <p>{textValue}</p>
            </div>
        </>
    )
}