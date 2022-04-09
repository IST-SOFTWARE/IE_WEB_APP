import styles from "../../styles/ProductPage/ProductPageParticles.module.css";
import NextImageRatioSaver from "../NextImageRatioSaver";
import { useRef, useEffect} from "react";

export default function AdditionalItem({img, name, vendCode}){


    return(
    <>  
        <div className={styles.AdditionalItem}>
            <div className={styles.AdditionalContainer}>

                    <NextImageRatioSaver
                        Img={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1649426240/ProductsImages/M02914-1_rwco0s.jpg"}
                        wPrime={true}
                        q={100}
                        unique={"AdditionalItem"}
                    />
                
                <p>
                Частотный преобразователь Kone KDL16L 14 Ампер (модернизация для V3F16L) с энкодером и кабелем
                </p>
            </div>
        </div>
    </>
    )
}