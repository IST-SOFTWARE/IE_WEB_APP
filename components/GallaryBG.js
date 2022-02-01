import styles from "../styles/Gallary.module.css"
import Image from "next/image"
import { useEffect, useState } from "react/cjs/react.development"

export default function GallaryBG({image}){

    const [imgWidth, setWidth] = useState(0);
    const [imgHeight, setHeight] = useState(0);

    useEffect(()=>{
        setWidth(image.naturalWidth)
        setHeight(image.naturalHeight)
    }, [image])

    return(
        <>
            <div className={styles.GallaryBlock}>
                {/* <Image
                    src={image}
                    width={imgWidth}
                    height={imgHeight}
                /> */}
            </div>
        </>
    )
}