import styles from "../../styles/ProductPage/ProductPageParticles.module.css";
import NextImageRatioSaver from "../NextImageRatioSaver";

export default function GeometryViewer({props}){
    return(
        <>
            <div className={styles.GeometryWrapper}>
                <div className={styles.GeometryImgWrapper}>
                    <div className={styles.GeometryImg}>
                        <NextImageRatioSaver
                            Img={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1649520741/FormFactorImages/1_A1-s_vbzxmv.gif"}
                            hPrime={true}
                            unique={"GeometryImg"}
                        />
                    </div>
                </div>
                <div className={styles.GeometryProps}>
                <ul>
                    <li><a>a = 500мм</a></li>
                    <li><a>b = 500мм</a></li>
                    <li><a>c = 500мм</a></li>
                </ul>
                
                </div>
            </div>
        </>
    )
}