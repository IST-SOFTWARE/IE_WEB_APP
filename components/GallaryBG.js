import styles from "../styles/Gallary.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"


export default function GallaryBG({image}){

    const [imgSize, setSize] = useState(
        {
            width: "0",
            height: "0"
        }
    );

    useEffect(()=>{
        let lImg = document.querySelector("#lilImgBg");
        setSize(
            {
                width: lImg.naturalWidth,
                height: lImg.naturalHeight
            }
        )
    }, [image])

    return(
        <>
            <div className="GallaryBlock">
                <img src={image} width="0px" id="lilImgBg"/>
                <div className={styles.GalleryBorder}>
                    <div className={styles.gallaryImg}>
                        <Image
                            className="backImg"
                            src={image}
                            layout="fill"
                        />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .GallaryBlock{
                        overflow: hidden;
                        position: absolute;
                        right: 0;
                        top:0;
                        z-index: 0;
                        height: 100vh;
                        width: calc((${imgSize.width} / ${imgSize.height}) * 100vh);                 
                }
            `}</style>
        </>
    )
}