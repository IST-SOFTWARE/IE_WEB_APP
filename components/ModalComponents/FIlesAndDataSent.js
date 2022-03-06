import { useState, useEffect} from "react";
import styles from "../../styles/ModalComponents/ModalBase.module.css";
import Image from "next/image";

export default function FilesAndDataSent({backImg, w, h, children}) {

    const[backImgUrl, setBgImg] = useState("/null_bg.png");

    useEffect(() => {
        backImg !== undefined ? setBgImg(backImg) : setBgImg("/null_bg.png");
    },[])

    return(
        <>
            <div className={styles.FilesAndDataImgBlock}>
            <Image
                src={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1646485035/PopUpImgs/svgviewer-output_11_1_wyprns.svg"}
                layout="fill"
                q={100}
            />
            </div>

            <div className={styles.ModalFormContent}>          
                <div className={`${styles.PUbackImg} ${styles.FilesAndData}`}>
                    <Image
                        src={backImgUrl}
                        width={w}
                        height={h}
                        q={50}
                        crop="fill"
                    />
                </div>
            </div> 
        </>
    )
}