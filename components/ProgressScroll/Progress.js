import { useState, useEffect, useCallback, useContext} from "react";
import styles from "../../styles/ModalComponents/ProgressBar.module.css";
import PageLevelsVisContext from "../Context/PageLevelsVisContext";
import PrPoint from "./PrPoint";

export default function Progress(){
    const[PointsNum, setPointsNum] = useState([]);
    const[SizeBlock, SetSize] = useState(0);
    const[activeId, setActive] = useState(0);
    // const[scrollp, setScroll] = useState(0);
    const poiters = [];

    const PageLevelsVis = useContext(PageLevelsVisContext);
    
    const onScroll = () => {
        const PB_cont = document.querySelector(`.${styles.PB_container}`);

        const winScroll = document.documentElement.scrollTop;
        const contentHeight = document.getElementById("pages_content").offsetHeight;

        const height = contentHeight -
            document.documentElement.clientHeight;

        const scrolled = (winScroll / height) * 100;

        if(PB_cont !== null)
            if(scrolled > 110)
                PB_cont.classList.add(`${styles.footer}`);
            else
                PB_cont.classList.remove(`${styles.footer}`);


            if(PointsNum.find(point => point.scroll === Math.round(scrolled)) != undefined){

                    setActive(PointsNum.find(point => point.scroll
                        === Math.round(scrolled)).id
                    );

            }

        };

    const Pointer = (pgVal) =>{
        for(let i=0; i < pgVal; i++){
            let add = {
                id: i,
                scroll: ((i * 100)/(pgVal-1))
            };
            
            // console.log(i);
            poiters.push(add);
            setPointsNum(poiters);
        }
    };

    
    useEffect(()=>{
        const pages = document.getElementById("LandPageContainer").childElementCount - 1;
        SetSize((document.querySelector(`.${styles.PB_container}`).offsetHeight) / pages);
        Pointer(pages);
    },[]);

    useEffect(()=>{
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    },[PointsNum]);

    const PointsList = PointsNum.map((point) =>
        <PrPoint
        key={point.id}
        size={SizeBlock}
        id={point.id}
        active={activeId}
        scroll={point.scroll}
        switchValue={document.getElementById("pages_content").offsetHeight}
        />
    )

    return(
        <>
            <div className={PageLevelsVis.mobilePageLevels ? styles.PB_container + " " + styles.mob_hide : styles.PB_container}>
                {PointsList}
            </div>
        </>
    );
}