import styles from "../styles/ProdDemo.module.css"
import Image from "next/image";

export default function PrTypeCard({img, crop, text}){
    return(
        <>
            <div className={styles.PrTypeCard}>
                <div className={styles.ImgCardBlock}>
                <Image
                    src={img}
                    width={240 * crop}
                    height={240 * crop}
                />
                </div>
                <p>
                    {text}
                </p>
            </div>
        </>
    );
}