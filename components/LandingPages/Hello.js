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
        img : "https://cdn.mesto.ru/uploads/post/news/picture/9363/lifty.jpg"
    },
    {
        id: "2",
        text : "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
        img: "https://oooevna.ru/wp-content/uploads/6/2/2/62274407fd63b1cbdaa14a045904ad7f.jpeg"
    },
    {
        id: "3", 
        text : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        img: "https://alter-lift.ru/images/upload/sites/site_id_7405/news/%7B99B3D84E-7B12-61A1-82F9-58C39BB94059%7D.jpg"
    },
    {
        id: "4", 
        text : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        img: "https://offers-api.agregatoreat.ru/api/file/f46b9a30-8c73-4def-b27f-4729caf4d526"
    },
    {
        id: "5", 
        text : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        img: "https://phonoteka.org/uploads/posts/2021-05/1620783700_30-phonoteka_org-p-fon-lifta-vnutri-35.jpg"
    }
]


export default function Hello(){

    const [image, setImage] = useState(gallary[0].img);

    const imageChenger = (nImg) => {
        setImage(nImg);
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
                            ОБОРУДОВАНИЕ ДЛЯ ЛИФТОВ<br/>
                            И ЭСКАЛАТОРОВ
                        </MainLabel>
                        <h2>Lift your business up<br/>
                        with IST Elevator.</h2>
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
