import styles from "../../styles/ProductPage/ProductPageParticles.module.css";
import NextImageRatioSaver from "../NextImageRatioSaver";

import { useEffect, useState } from "react";

export default function GeometryViewer({imagePath, geoSizes}){

    const[gImage, setGeoImage] = useState();
    const[gSizes, setSizes] = useState();
    const[isLoaded, setLoad] = useState(false);

    useEffect(()=>{
        if(imagePath && geoSizes){
            setGeoImage(imagePath);
            setSizes(geoSizes);
            setLoad(true);
        }
    }, [geoSizes, imagePath])


    return isLoaded ? (
        <>
            <div className={styles.GeometryWrapper}>
                <div className={styles.GeometryImgWrapper}>
                    <div className={styles.GeometryImg}>
                        <NextImageRatioSaver
                            Img={gImage}
                            hPrime={true}
                            unique={"GeometryImg"}
                        />
                    </div>
                </div>
                <div className={styles.GeometryProps}>
                <ul>
                    <li><a>{geoSizes}</a></li>

                    {/*{Object.keys(gSizes).map(((k, i) =>*/}
                    {/*    gSizes[k] !== null ? */}
                    {/*        <li key={i}><a>{k} = {gSizes[k]} мм</a></li> : */}
                    {/*    ""*/}
                    {/*))}                */}
                </ul>
                
                </div>
            </div>
        </>
    ):
    (
        <>
        </>
    )
}