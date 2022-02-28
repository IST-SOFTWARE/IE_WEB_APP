import styles from "../../../styles/AttachPage.module.css"
import Image from "next/image"
import MainLabel from "../../MainLabel"
import ATContentBlock from "./APContentBlock"
import APAttachBlock from "./APAttachBlock"

export default function AttachPage(){
    return(
        <>
                <div className={styles.AttachContent}>
                    <div className={styles.LeftContent}>
                        <MainLabel padding={"130px"}>
                        ГОТОВЫ ИЗГОТАВЛИВАТЬ
                        СЛОЖНЫЕ ДЕТАЛИ ПО
                        ВАШИМ ЧЕРТЕЖАМ И
                        ЭСКИЗАМ 
                        </MainLabel>
                        
                        <ATContentBlock StepNum={1}>
                            <APAttachBlock/>
                        </ATContentBlock>

                    </div>
                    <div className={styles.RightContent}>
                    </div>     

                <div className={styles.AttachContentBg}>
                    <Image
                        src={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1645799192/AttachPageImages/Rectangle_23_rv90lv.png"}
                        width={1452}
                        height={1000}
                        layout="fixed"
                        />
                </div>  

                </div>
        </>
    )
}