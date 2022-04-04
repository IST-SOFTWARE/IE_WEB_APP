import Image from "next/image";
import { useState, useEffect, useCallback, useMemeo} from "react";


    // wp-true + hp-none => wp
    // wp-true + hp-true => wp
    // wp-none + hp-none => wp

    // hp-true + wp-none => hp

export default function NextImageRatioSaver({Img, wPrime, hPrime}){
      
    const[lilImgLoad, setLilLoad] = useState(false);

    const[imageSize, setSize] = useState({
        width: 0,
        height: 0
    })

    const[calibratedSize, setCalibrated] = useState({
        width: 0,
        height: 0
    })

    const[PrimeOpt, setPrime] = useState({
        width: true,
        height: false
    });


    // W-PRIME IS DEF 

    useEffect(()=>{
        if(wPrime === undefined){
            setPrime({
                width: false,
                height: true
            })
        }
        else if(hPrime === undefined){
            setPrime({
                width: true,
                height: false
            })
        }
        else if(hPrime===undefined && wPrime===undefined){
            setPrime({
                width: true,
                height: false
            })
        }
        else if(hPrime===true && wPrime===true){
            setPrime({
                width: true,
                height: false
            })
        }
        else if(hPrime===false && wPrime===false){
            setPrime({
                width: true,
                height: false
            })
        }
        else{
            setPrime({
                width: wPrime,
                height: hPrime
            })
        }

    },[])

    const resizer = (CalibrationItem) => {
        if(PrimeOpt.width){
           
            setCalibrated({
                width: CalibrationItem.offsetWidth,
                height: (imageSize.width/imageSize.height) * CalibrationItem.offsetWidth
            })
        }
        else if(PrimeOpt.height){
  
            setCalibrated({
                width: (imageSize.width/imageSize.height) * CalibrationItem.offsetHeight,
                height: CalibrationItem.offsetHeight
            })
        }
    }

    const windowSizeListener = () => {
        const CalibrationItem = document.querySelector(".CalibrationBlock");
        
        if(calibratedSize.height > 0 && (calibratedSize.height !== CalibrationItem.offsetHeight) && PrimeOpt.height){
            resizer(CalibrationItem);
            console.log("HEIGHT CHANGED!" , "Base: ", calibratedSize.height , "Calib: ", CalibrationItem.offsetHeight);
            
        }
        
        else if(calibratedSize.width > 0 && (calibratedSize.width !== CalibrationItem.offsetWidth) && PrimeOpt.width){
        
            console.log("WIDTH CHANGED!" , "Base: ", calibratedSize.width , "Calib: ", CalibrationItem.offsetWidth);
            resizer(CalibrationItem);
            
        }
    }

    useEffect(()=>{ 
        window.addEventListener("resize", windowSizeListener, false);
        return () => {
            window.removeEventListener("resize", windowSizeListener, false);
          };

    },[calibratedSize, PrimeOpt])

    useEffect(()=>{
        const CalibrationItem = document.querySelector(".CalibrationBlock");

        if(!CalibrationItem.classList.contains(".Ex")){
        CalibrationItem.classList.add("Ex");

        resizer(CalibrationItem);

        }

    },[imageSize])


    // useEffect(()=>{
    // if(lilImgLoad){
    //    const lImg = document.querySelector("#lil_img_");
    //    setSize(
    //     {
    //         width: lImg.naturalWidth,
    //         height: lImg.naturalHeight
    //     })
    // }
    // },[lilImgLoad]);


    // WAS CHENGED. Prev Wersion --^
    useEffect(()=>{

        const lImg = document.querySelector("#lil_img_");
        setSize(
         {
             width: lImg.naturalWidth,
             height: lImg.naturalHeight
         })
     },[]);


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