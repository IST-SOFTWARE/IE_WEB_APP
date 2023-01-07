import styles
    from "../../../../styles/LandingStyles/GalleryComponent/gallery.module.scss"
import Image from "next/image"
import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from "react"
import {IGallery} from "../../../GalleryTypes/GalleryTypes";
import Link from "next/link";
import IstButton from "../../../UI/ISTButton/IstButton";

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


const Gallery:FC<IGallery> = (
                {
                    slides
                }) => {

    const galleryImage = useRef(null);
    const galleryText = useRef<HTMLParagraphElement>(null)

    const [actualSlide, setActualSlide] = useState<number>(0);
    const[imageUpdated, setImageUpdated] = useState<boolean>(false);


    useEffect(()=>{
        let timeOut;

        let newSlideIndex = 0;

        if(actualSlide === slides.length - 1)
            newSlideIndex = 0;
        else
            newSlideIndex = actualSlide + 1;

        if(slides.length > 0)
            timeOut = setTimeout(() => {
                switchSlide(galleryImage, {
                    boolAction: false,
                    dataSetter: setActualSlide,
                    newState: newSlideIndex,
                    delayMS: 250
                })
            }, 5000);

        return ()=> clearTimeout(timeOut);
    },[actualSlide])

    useEffect(()=>{
        switchSlide(galleryImage, {
            boolAction: true,
            delayMS: 250
        })
    },[imageUpdated])

    useEffect(()=>{
    //       {slides[actualSlide]?.title}

    galleryText.current.innerHTML =
        slides[actualSlide]?.title;

    },[actualSlide])


    // useEffect(()=>{
    //     let timeOut;
    //
    //
    //     let newSlideIndex = 0;
    //
    //     if(actualSlide === slides.length - 1)
    //         newSlideIndex = 0;
    //     else
    //         newSlideIndex = actualSlide + 1;
    //
    //     if(slides.length > 0)
    //         timeOut = setTimeout(() => {
    //             switchSlide(newSlideIndex, setActualSlide, galleryImage)
    //         }, 5000);
    //
    //     return ()=> clearTimeout(timeOut);
    // },[actualSlide])

    // useEffect(()=>{
    //     if(imageUpdated){
    //         setImageUpdated(false);
    //     }
    // }, [imageUpdated])

    // useEffect(()=>{
    //     switchSlide(galleryImage, false);
    // // },[actualSlide])

    const switchSlide = async(
                            obj: React.MutableRefObject<HTMLDivElement>,
                            actor: {
                                dataSetter?: React.Dispatch<any>
                                newState?: any
                                boolAction: boolean
                                delayMS: number
                            }
                         ) => {

        function hideSide() {
            obj.current?.classList.add(styles.hide);
        }

        function showSlide() {
            obj.current?.classList.remove(styles.hide);
        }

        async function asyncDelay(ms:number){
            return new Promise(resolve =>
                {setTimeout(resolve, ms)
            })
        }

        if(actor.boolAction){
            await asyncDelay(actor.delayMS).then(()=>{
                showSlide();
            })
        }

        else{
            hideSide();
            await asyncDelay(actor.delayMS).then(()=>{
                actor.dataSetter(actor.newState);
            })

        }


    }

    return (
        <>
            <div className={styles.galleryBlock}>
                <div className={styles.gtBlock}>
                    <div className={styles.textBlock}>
                        {/*GALLERY TEXT*/}
                        <p ref={galleryText}/>
                    </div>
                    <div className={styles.pointsBlock}>
                        <div className={styles.actionBtn}>
                            {slides[actualSlide]?.action ? (
                                <Link href={slides[actualSlide]?.action}>
                                    Подробнее...
                                </Link>

                            ): null}

                        </div>
                        <div className={styles.points}>
                            {slides.map((slide_point,point_i) => (
                                <button
                                    className={point_i === actualSlide ?
                                        `${styles.galleryPoint} ${styles.active}` :
                                        `${styles.galleryPoint}`
                                    }
                                    key={`${point_i}_gal_point`}
                                    onClick={()=>{
                                        switchSlide(galleryImage, {
                                            boolAction: false,
                                            dataSetter: setActualSlide,
                                            newState: point_i,
                                            delayMS: 250
                                        })
                                        // switchSlide(point_i, setActualSlide, galleryImage )
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>


            <div className={styles.GalleryBlock}>
                <div className={styles.GalleryBorder}>
                    <div className={styles.galleryImg}
                         ref={galleryImage}>
                            <Image
                                onLoad={()=>setImageUpdated(!imageUpdated)}
                                className="backImg"
                                src={slides[actualSlide]?.image}
                                fill={true}
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center"
                                }}
                                placeholder="blur"
                                alt="Gallery_background"
                                blurDataURL={rgbDataURL(44, 54, 65)}
                                priority={true}
                                sizes={"auto"}
                            />

                    </div>
                </div>
            </div>
        </>
    )
                
}

export default Gallery;