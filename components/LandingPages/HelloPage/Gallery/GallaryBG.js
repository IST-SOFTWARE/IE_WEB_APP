import styles from "../../../../styles/Gallary.module.css"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`


export default function GallaryBG({image}){

    const [isLoaded, setLoad] = useState(false);

    const [imgSize, setSize] = useState(
        {
            width: "0",
            height: "0"
        }
    );

    // const imgInjector = useMemo(()=>{
    //     lImg = document.querySelector("#lilImgBg");
    // },[image]);

    useEffect(()=>{
        if(image && image !== null){
            setLoad(true);
        }
    })

    useEffect(()=>{
        if(isLoaded){
        setTimeout(() => {
            let lImg = document.querySelector("#lilImgBg");
            setSize(
                    {
                    width: lImg.naturalWidth,
                    height: lImg.naturalHeight
                    }
                )
        }, 150);
    }
            // console.log(imgSize);
    },[isLoaded])

    return isLoaded ? (
        <>
            <div className="GallaryBlock">
                <img src={image} width="0px" id="lilImgBg"/>
                <div className={styles.GalleryBorder}>
                    <div className={styles.gallaryImg}>
                        <Image
                            className="backImg"
                            src={image}
                            layout="fill"
                            placeholder="blur"
                            alt="Gallary background"
                            blurDataURL={rgbDataURL(44, 54, 65)}
                        />
                    </div>
                </div>
            </div>
            <style jsx>{`
                /* should be edit!!! */
                                
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
    ) :
    (
        <>
        <div className="GallaryBlock">

        </div>

    </>
    )
                
}