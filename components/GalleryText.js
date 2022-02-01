import { useState } from "react";
import styles from "../styles/Gallary.module.css"
import GallaryPoint from "./GallaryPoint"

export default function GallaryText(props) {

    const [slide, setSlide] = useState(props.defText);
    const [activeId, setId] = useState(props.defId);

    const SwitchSlide = (itemId) => {
        setSlide(slide = 
            Points.find(item => item.id === itemId.toString()).text);
        setId(itemId);
    }

    const Points = props.gallary;
    const PointsList = Points.map((point) =>
        <GallaryPoint
        key={point.id} 
        SlideSwitcher={SwitchSlide}
        id={point.id}
        activeId={activeId}/>
    );


    return(
        <>
        <div className={styles.gtBlock}>
            <div className={styles.textBlock}>
                <p>
                    {slide}
                </p>
            </div>
            <div className={styles.pointsBlock}>
                {PointsList}
            </div>
        </div>
        </>
    )
}