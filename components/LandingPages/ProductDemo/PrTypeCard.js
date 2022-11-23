import styles from "../../../styles/LandingStyles/PagesComponents/ProductDemo/ProdDemo.module.scss"
import Image from "next/image";

export default function PrTypeCard({img, crop, text,
                                       boiler, boilerSetter,
                                       activator}){
    
    const setOption = () => {
        activator(true);
        boilerSetter(boiler);
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
                    alt={img}

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