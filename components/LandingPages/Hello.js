import styles from "../../styles/HelloPage.module.css"
import MainLabel from "../MainLabel";
import CallBack from "../CallBack";
import ScrollDown from "../ScrollDown";
import GallaryText from "../GalleryText";
import GallaryBG from "../GallaryBG";
import { useEffect, useState } from "react";

const gallary = [
    {
        "id" : "1",
        "eng" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
        "ru": "С другой стороны укрепление и развитие структуры обеспечивает участие в формировании систем массового участия",
        "img" : "https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893566/1_lstole.jpg"
    },
    {
        "id" : "2",
        "eng" : "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
        "ru": "Равным образом рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров",
        "img" : "https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893565/3_d34xcu.jpg"
    },
    {
        "id" : "3",
        "eng" : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        "ru": "Таким образом реализация намеченных плановых заданий позволяет оценить значение новых предложений",
        "img" : "https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893566/2_kxznf2.jpg"
    },    
    {
        "id" : "4",
        "eng" : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
        "ru": "Повседневная практика показывает, что реализация намеченных плановых заданий в значительной степени обуславливает",
        "img" : "https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893565/4_xwhyv9.jpg"
    },    
    {
        "id" : "5",
        "eng" : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        "ru": " Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности обеспечивает широкому",
        "img" : "https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893565/6_k9dgel.jpg"
    }
    ]


export default function Hello({HelloLangChecker, content, lang}){
    const [image, setImage] = useState((gallary[0])["img"]);
    const imageChenger = (nImg) => {
        setImage(nImg);
    }

    // function LangChecker(def, settings, lng){ 
    //     return ((content[settings])[lng] === undefined) ? 
    //     def : 
    //     (content[settings])[lng];
    // }

    return(
        <>
            <GallaryBG image={image}/>
            <div className={styles.HelloContent}>
                <div className={styles.LeftBlock}>
                    <div>
                        <MainLabel padding="50px">
                            {HelloLangChecker(content,
                            "ОБОРУДОВАНИЕ ДЛЯ ЛИФТОВ\nИ ЭСКАЛАТОРОВ"
                            ,"Label", lang)}
                        </MainLabel>
                        <h2>
                            {HelloLangChecker(content,
                                "Lift your business up\nwith IST Elevator."
                                ,"Tagline", lang)}
                        </h2>
                    </div>

                    <CallBack
                    cbLangChecker={HelloLangChecker}
                    lContent = {content}
                    lng={lang}
                    />       
                                     
                    <ScrollDown
                        text=
                        {HelloLangChecker(content,
                        "Листай вниз"
                        ,"ScrollDown", lang)}
                    />
                </div>

                <div className={styles.RightBlock}>
                    <GallaryText 
                    gallary={gallary}
                    defText={
                        HelloLangChecker(gallary,
                            "TextSlide"
                            ,"0", lang)
                    }
                    defId={(gallary[0])["id"]}
                    defImg={(gallary[0])["img"]}
                    slideBg={imageChenger}
                    lng = {lang}
                    />
                </div>
            </div>
        </>
    )
}
