import Image from "next/image";
import { useState, useEffect, useCallback} from "react";

export default function NextImageRatioSaver({Img, id, wPrime, hPrime}){
    const[lilImgLoad, setLilLoad] = useState(false);
    const[bigImgContLoad, setBigContLoad] = useState(false);
    const[CalibrationBlockEx, setEx] = useState(false);

    const[imageSize, setSize] = useState({
        width: 0,
        height: 0
    })

    const[calibratedSize, setCalibrated] = useState({
        width: 0,
        height: 0
    })

    useEffect(()=>{
        const CalibrationItem = document.querySelector(".CalibrationBlock");
        // console.log(CalibrationItemEx);
        
        if(!CalibrationItem.classList.contains(".Ex")){
        CalibrationItem.classList.add("Ex");

        if((wPrime !== 0 || wPrime !== false) && (hPrime === undefined || hPrime === null)){
           
            setCalibrated({
                width: CalibrationItem.offsetWidth,
                height: (imageSize.width/imageSize.height) * CalibrationItem.offsetWidth
            })
        }
        else if((hPrime !== 0 || hPrime !== false) && (wPrime === undefined || wPrime === null)){
        
            setCalibrated({
                width: (imageSize.width/imageSize.height) * CalibrationItem.offsetHeight,
                height: CalibrationItem.offsetHeight
            })
        }

            console.log("SIZES: ", CalibrationItem.offsetWidth, CalibrationItem.offsetHeight)
        }

    },[imageSize])


    useEffect(()=>{
    if(lilImgLoad){
       const lImg = document.querySelector("#lil_img_");
       setSize(
        {
            width: lImg.naturalWidth,
            height: lImg.naturalHeight
        })
    }
    },[lilImgLoad]);


    return(
        <>
            <div style={{position: `relative`, width:`100%`, height:`100%`}}>
                <img src={Img} width="0px" style={{position: `absolute`}}
                id={"lil_img_"}
                onLoad={()=>setLilLoad(true)}/>
                    
                <div className="CalibrationBlock"
                    style={{width: `100%`,
                    height: `100%`,
                    position: `absolute`}}>
                </div>

                <div className={"NextImageRatioSaver"}
                    style={{width: calibratedSize.width + `px`,
                    height: calibratedSize.height + `px`,
                    position: `relative`}}>

                    <Image
                    src={Img}
                    layout="fill"
                /> 
                </div>
               
            </div>
        </>
    )
}