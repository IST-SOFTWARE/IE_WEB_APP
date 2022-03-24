import Image from "next/image";
import { useState, useEffect, useCallback} from "react";

export default function NextImageRatioSaver({Img, id, wPrime, hPrime}){
    const[lilImgLoad, setLilLoad] = useState(false);
    const[bigImgContLoad, setBigContLoad] = useState(false);

    const[imageSize, setSize] = useState({
        width: 0,
        height: 0
    })

    const updateSize = useCallback(
        () => {
            const BigImgCont = document.querySelector(`.${"NextImageRatioSaver_" + id}`);

 
            const BI_Height = BigImgCont.offsetHeight;
            const BI_Width = BigImgCont.offsetWidth;

                if((wPrime !== 0 || wPrime !== false) && (hPrime === undefined || hPrime === null)){
                    BigImgCont.style.height = ((imageSize.width/imageSize.height) * BI_Width).toString() + "px"
                    console.log(BI_Height, BI_Width);
                }
                else if((hPrime !== 0 || hPrime !== false) && (wPrime === undefined || wPrime === null)){
                    BigImgCont.style.width = ((imageSize.width/imageSize.height) * BI_Height).toString() + "px"
                    console.log(BI_Height, BI_Width);
                }
        
        },
        [bigImgContLoad, lilImgLoad],
      );

    useEffect(()=>{
    if(lilImgLoad){
       const lImg = document.querySelector("#lil_img_" + id);
       setSize(
        {
            width: lImg.naturalWidth,
            height: lImg.naturalHeight
        })

       
        // console.log("IMG_SIZE: ", lImg);
    }
    },[lilImgLoad]);

    useEffect(()=>{
        updateSize();
    },[bigImgContLoad])

    return(
        <>
                <img src={Img} width="0px" style={{position: `absolute`}}
                id={"lil_img_" + id}
                onLoad={()=>setLilLoad(true)}/>

                <div className={"NextImageRatioSaver_" + id}
                    style={{width: `100%`,
                    height: `100%`,
                    position: `relative`}}
                    onLoad={()=>setBigContLoad(true)}>

                    <Image
                    src={Img}
                    layout="fill"
                    />
                </div>
        </>
    )
}