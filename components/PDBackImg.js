import styles from "../styles/ProdDemo.module.css"
import Image from "next/image";

export default function PDBackImg({url, speed}){
    return(
        <>
            <div className="bg_item"
            data-speed={speed}>
                <div className={styles.PDBackImg}>
                    <div className={styles.PDBIContent}>
                    <Image
                        src={url}
                        layout="fill"
                    />
                    </div>
                </div>
            </div>

            <style jsx global>{`
            .bg_item{
                position: absolute;
                width: calc((1920 / 1080) * 100vh);
                height: 100%;
                left: 0;
            }
            `}</style>
        </>
    )
}