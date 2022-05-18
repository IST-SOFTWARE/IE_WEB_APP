import { useState , useEffect } from "react";
import styles from "../../../../styles/Gallary.module.css"
import GallaryPoint from "./GallaryPoint"
import LabelLoader from "../../../ModalComponents/LabelLoader";

export default function GallaryText(props) {

    // const [slide, setSlide] = useState(props.defText);
    // const [activeId, setId] = useState(props.defId);

    const [mainGallery, setGallery] = useState(null);
    const [slide, setSlide] = useState(null);
    const [activeId, setId] = useState(0);

    const[imageLoaded, setLoad] = useState(false);


    useEffect(()=>{
        if(props.gallary && props.gallary !== null){
            setGallery(props.gallary);
        }
    });

    useEffect(()=>{

        if(mainGallery && mainGallery !== null){
            if(!(props.gallary[0])["img"] || !(props.gallary[0])["ru"] || !(props.gallary[0])["eng"] || !(props.gallary[0])["eng"]){
                console.error("The Gallery Object should be like this:\n[]");
            }
            else{
                setLoad(true);
                console.log();
            }

        }

    },[mainGallery]);

    
    useEffect(()=>{
        if(imageLoaded){
            setId((mainGallery[0])["id"]);
            setSlide((mainGallery[0])["eng"]);
            console.log(mainGallery);
        }
    },[imageLoaded]);


    // useEffect(()=>{
    //     imageLoaded ? setSlide( 
    //         mainGallery.find(item => item["id"] === activeId.toString())[props.lng]) : null;
    // },[props.lng, imageLoaded])

    const SwitchSlide = (itemId) => {
        props.slideBg(
            mainGallery.find(item => item["id"] === itemId.toString())["img"]);
        setSlide(slide = 
            mainGallery.find(item => item["id"] === itemId.toString())[props.lng]);
        setId(itemId);
    }

    
    // const PointsList = mainGallery.map((point) =>
    //     <GallaryPoint
    //     key={point["id"]} 
    //     SlideSwitcher={SwitchSlide}
    //     id={point["id"]}
    //     activeId={activeId}/>
    // );


    return imageLoaded ? (
        <>
        <div className={styles.gtBlock}>
            <div className={styles.textBlock}>
                <p>
                    {slide}
                </p>
            </div>
            <div className={styles.pointsBlock}>
                {mainGallery.map((point) =>
                <GallaryPoint
                key={point["id"]} 
                SlideSwitcher={SwitchSlide}
                id={point["id"]}
                activeId={activeId}/>)}
            </div>
        </div>
        </>
    ) :
    (
        <>
            <div className={styles.gtBlock + " " + styles.unload}>

            </div>
        </>
    )
}