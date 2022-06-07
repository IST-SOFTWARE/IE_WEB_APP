import styles from "../../styles/ProductPage/ProductPageParticles.module.css";
import NextImageRatioSaver from "../NextImageRatioSaver";
import { useRef, useEffect, useState} from "react";
import ComponentLoader from "../ComponentLoader";
import Link from 'next/link'

export default function AdditionalItem({img, name, slug}){

    const[data, setData] = useState();

    useEffect(()=>{
        if(img && name && slug){
            setData({
                img,
                name,
                slug
            })
        }
    },[])

    return(
    <>  
    <Link href={data ? `/products/${slug}` : "/"}>
        <div className={styles.AdditionalItem} 
            style={!data ? {
                margin: 20 + "px",
                Width: 80 + '%',
                minWidth: 0
            } : null}
        >
            <ComponentLoader data={data} >
                <div className={styles.AdditionalContainer}>
                    <NextImageRatioSaver
                        Img={data ? data.img : ""}
                        wPrime={true}
                        q={100}
                        unique={"AdditionalItem"}
                    />
                
                    <p className={styles.AdditionalTitle}>
                    {data ? data.name : ""}
                    </p>
                </div>
            </ComponentLoader>
        </div>
    </Link>
    </>
    )
}