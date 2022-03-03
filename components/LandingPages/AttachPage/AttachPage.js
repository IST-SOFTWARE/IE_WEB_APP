import styles from "../../../styles/AttachPage.module.css"
import Image from "next/image"
import MainLabel from "../../MainLabel"
import ATContentBlock from "./APContentBlock"
import APAttachBlock from "./APAttachBlock"
import InputItem from "./InputItem"

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
                        
                        <div className={styles.AttachBlockParent}>
                            <ATContentBlock StepNum={1}>
                                <APAttachBlock/>
                            </ATContentBlock>
                        </div>

                    </div>
                    
                    <div className={styles.RightContent}>

                    <div className={styles.UserInputBlockParent}>
                        <ATContentBlock StepNum={2}>

                                <div className={styles.ABContainerInput}>   

                                    <div className={styles.ABHeaderInput}>
                                        <p>Регистрация:</p>
                                        <a>Уже зарегистрирован...</a>
                                    </div>

                                        <InputItem Title={"ИНН Организации"} Placeholder={"1111111111"} id="1"/>
                                        <InputItem Title={"Название компании"} Placeholder={"ОТИС Лифт"} id="2"/>
                                        <InputItem Title={"ФИО представителя"} Placeholder={"Андреев Андрей Андреевич"} id="3"/>
                                        <InputItem Title={"Должность представителя"} Placeholder={"Менеджер по закупкам"} id="4"/>
                                        <InputItem Title={"Контактный телефон"} Placeholder={"+7(000)000 00 00"} id="5"/>
                                        <InputItem Title={"Email"} Placeholder={"info@istlift.ru"} id="6"/>

                                </div>
                            </ATContentBlock>
                        </div>

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