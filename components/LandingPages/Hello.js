import styles from "../../styles/HelloPage.module.css"
import MainLabel from "../MainLabel";
import CallBack from "../CallBack";
import ScrollDown from "../ScrollDown";
import GallaryText from "../GalleryText";
import GallaryBG from "../GallaryBG";
import { useEffect, useState } from "react";

const gallary = [
    {
        id: "1", 
        text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
        img : "https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893566/1_lstole.jpg"
    },
    {
        id: "2",
        text : "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
        img: "https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893565/3_d34xcu.jpg"
    },
    {
        id: "3", 
        text : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        img: "https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893566/2_kxznf2.jpg"
    },
    {
        id: "4", 
        text : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        img: "https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893565/4_xwhyv9.jpg"
    },
    {
        id: "5", 
        text : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        img: "https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893565/6_k9dgel.jpg"
    }
]


export default function Hello({content, lang}){
    const [image, setImage] = useState(gallary[0].img);
    const imageChenger = (nImg) => {
        setImage(nImg);
    }

    function LangChecker(def, settings, lng){ 
        return ((content[settings])[lng] === undefined) ? def : (content[settings])[lng];
    }

    // useEffect(()=>{

    // })

    return(
        <>
            <GallaryBG image={image}/>
            <div className={styles.HelloContent}>
                <div className={styles.LeftBlock}>
                    <div>
                        <MainLabel padding="50px">
                            {LangChecker(
                            "ОБОРУДОВАНИЕ ДЛЯ ЛИФТОВ И ЭСКАЛАТОРОВ"
                            ,"Label", lang)}
                        </MainLabel>
                        <h2>
                            {LangChecker(
                                "Lift your business up with IST Elevator."
                                ,"Tagline", lang)}
                        </h2>
                    </div>
                    <CallBack phone="+7(000)000-00-00"/>
                    <ScrollDown/>
                </div>

                <div className={styles.RightBlock}>
                    <GallaryText 
                    gallary={gallary}
                    defText={gallary[0].text}
                    defId={gallary[0].id}
                    defImg={gallary[0].img}
                    slideBg={imageChenger}
                    />
                </div>
            </div>
        </>
    )
}
