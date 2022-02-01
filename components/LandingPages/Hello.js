import styles from "../../styles/HelloPage.module.css"
import MainLabel from "../MainLabel";
import CallBack from "../CallBack";
import ScrollDown from "../ScrollDown";
import GallaryText from "../GalleryText";
import GallaryBG from "../GallaryBG";

const gallary = [
    {
        id: "1", 
        text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore "
    },
    {
        id: "2",
        text : "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi"
    },
    {
        id: "3", 
        text : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
    },
    {
        id: "4", 
        text : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        id: "5", 
        text : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam"
    }
]

export default function Hello(){
    return(
        <>
            <GallaryBG image="/bgGlry.jpg"/>
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
                    />
                </div>
            </div>
        </>
    )
}
