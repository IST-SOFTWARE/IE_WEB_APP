import React, {FC, useEffect, useRef, useState} from "react";
import styles from "../../styles/LandingStyles/mainLabel.module.scss"

import LandingLabelBuilder from "./LandingLabelBuilder";
import {IMainLabel, IWord} from "./ILandingLabel";


const MainLabel:FC<IMainLabel> = (
    {
        padding,
        title
    }) => {

    const[labelData, setLabelData] = useState<string>(null);
    const[styledData, setStyledData] = useState<Array<IWord>>(null)

    const titleContent = useRef(null)

    useEffect(() => {
        setLabelData(title ? title : "");
    }, [title])

    useEffect(()=>{
        if(labelData) {
            // console.log(labelData);
            setStyledData(LandingLabelBuilder(labelData));
        }
    },[labelData])

    return (
        <>
            <div  style={{marginTop: padding}} className={styles.MainLabel}>
                <h1 ref={titleContent}>
                    {styledData ? styledData.map((elem, index) =>{
                        if(elem.underline || elem.link){
                            return (
                                <span key={`${index}_label_UL_item`}
                                      className={styles.label_under}>
                                  {`${elem.word} `}
                                </span>
                            )
                        }
                        return `${elem.word} `
                    }): null}
                </h1>
            </div>

        </>
    )
};

export default MainLabel;



