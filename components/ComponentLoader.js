import { useEffect, useState} from "react"
import styles from "../styles/LabelLoader.module.css"

export default function ComponentLoader({data, children, data_setter}){

    const[isLoaded, setLoaded] = useState(false);
    const[returnVal, setReturn] = useState("Loading Error...");

  
    useEffect(() => {
        if(data !== undefined && data !== null)
            setLoaded(true);
    });

    useEffect(() => {   
        setReturn(data);
        data_setter(data);
    },[isLoaded])

    return (isLoaded) ? (
        <>
            {children}
        </>
    )
    :
    (
        <>
            <div className={styles.ComponentLoader}>
               
            </div>
        </>
    )
}