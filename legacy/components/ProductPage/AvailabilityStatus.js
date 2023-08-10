import { useEffect, useState, useRef} from "react";
import styles from "./availabilityStatus.module.scss";
import { useRouter } from "next/router";
import ru from "../../../locales/ru";
import en from "../../../locales/en";

export default function AvailabilityStatus({status, value}){
    let ref = useRef();

    const router = useRouter();
    const t = router.locale === "ru-RU" ? ru : en;

    const[textValue, setText] = useState(t.availabilityStatus.check);


    
    // -1 not Available
    // 0 Check by phone
    // 1 is Available
    
    useEffect(()=>{
        const el = ref.current;
        
        if(status && el){
            el.className = `${styles.AvailabilityStatus}`

            if(status === -1){
                setText(t.availabilityStatus.out);
                el.classList.add(`${styles.notAvailable}`);
            }
            else if(status === 1){
                setText(t.availabilityStatus.availability);
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