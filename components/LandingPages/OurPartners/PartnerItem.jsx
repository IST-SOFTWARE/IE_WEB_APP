import styles from "../../../styles/OurPartners/ourPartnersParticles.module.css"
import NextImageRatioSaver from "../../NextImageRatioSaver";
import {useCallback, useEffect, useState} from "react";


export default function PartnerItem({image, item_tile, item_url }){
    const[itemHeight, setHeight] = useState(100);

    const handleUserResize = useCallback(event => {
        const item = document.querySelector(`.${styles.partnerItemBody}`);
        if(item){
            const width = item.clientWidth;
            setHeight(width);
        }
    }, []);

    useEffect(()=>{
        handleUserResize();
    },[])

    useEffect(()=>{
        window.addEventListener("resize", handleUserResize);
        return () => {
            window.removeEventListener("resize", handleUserResize);
        };
    },[handleUserResize]);

    return(
        <>
            <div className={styles.partnerItemBody} style={{
                height: itemHeight,
            }}>
                <NextImageRatioSaver
                    Img={image ? image : null}
                    primaryFill={"width"}
                />
            </div>
        </>
    )
}