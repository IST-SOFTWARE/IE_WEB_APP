import styles from "../../../styles/ProdDemo.module.css"
import Image from "next/image";

export default function PrTypeCard({img, crop, text,
                                       boiler, boilerSetter,
                                       activator}){
    
    const setOption = () => {
        boilerSetter(boiler);
        activator(true);
    }

    return(
        <>
            <div className={styles.PrTypeCard}
            onClick={() => setOption()}>
                <div className={styles.ImgCardBlock}>
                <Image
                    src={img}
                    width={240 * crop}
                    height={240 * crop}
                    q={100}
                />
                </div>
                <p>
                    {text}
                    <button>Подробнее...</button>
                </p>
            </div>

        </>
    );
}