// import { useEffect, useState, useReducer } from "react";
//
// import styles from "../../../styles/HelloPage.module.css"
//
// import CallBack from "./CallBack";
// import ScrollDown from "./ScrollDown";
// import GalleryText from "./Gallery/GalleryText"
// import GallaryBG from "./Gallery/Gallery";
// import CallBackModal from "../../ModalComponents/CallBackModal";
// import PopUpBase from "../../PopUpBase";
// import LabelLoader from "../../ModalComponents/LabelLoader";
//
// import ComponentLoader from "../../ComponentLoader";
// import MainLabel from "../../LandingLabels/MainLabel";
// import {getHomePageContent} from "../../../queries/getHomePageContent";
//
//
// export default function Hello({HelloLangChecker, content, lang, api_cont, callBack_api}){
//
//     const [pageContent, setPageContent] = useState(null);
//     const [pageGallery, setGalleryContent] = useState(null);
//
//     const [compLoaderData, setCompLoaderData] = useState();
//
//
//
//     useEffect(()=>{
//         if(api_cont){
//             console.log(api_cont);
//             setPageContent(api_cont.HomePage_Main);
//             setGalleryContent((api_cont.Main_Page_Gallery));
//         }
//     },[api_cont]);
//
//
//     const [image, setImage] = useState(null);
//     const[puState, setPU] = useState(false);
//
//     useEffect(()=>{
//         if(pageGallery){
//             setImage((pageGallery[0])["img"]);
//         }
//     }, [pageGallery]);
//
//
//     const imageChenger = (nImg) => {
//         setImage(nImg);
//     }
//
//
//
//     return(
//         <>
//             <div className={"col-12"}>
//                 <GallaryBG image={image}/>
//                 <div className={styles.HelloContent} id="CallBack">
//                     <div className={styles.LeftBlock}>
//
//                         <CallBack
//                         cbLangChecker={HelloLangChecker}
//                         lContent = {content}
//                         lng={lang}
//                         puProvider={setPU}
//                         api_data = {callBack_api}
//                         />
//
//
//                         <ScrollDown
//                             text=
//                             // {HelloLangChecker(content,
//                             // "Листай вниз"
//                             // ,"ScrollDown", lang)}
//                             {"Листай вниз"}
//                         />
//                     </div>
//
//                     <div className={styles.RightBlock}>
//                         <GalleryText
//                         gallary={pageGallery}
//                         // defText={
//                         //     // HelloLangChecker(pageGallery,
//                         //     //     "TextSlide"
//                         //     //     ,"0", lang)
//                         //     "sadcasdc"
//                         // }
//                         // defId={2}
//                         // defImg={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1643893565/GalleryImages/5_lou2pn.jpg"}
//                         slideBg={imageChenger}
//                         lng = {lang}
//                         />
//                     </div>
//                 </div>
//             </div>
//
//             {/*<PopUpBase puState={puState} closer={setPU}*/}
//             {/*    header={compLoaderData ? compLoaderData.CallBack_Title_Ru : ""}*/}
//             {/*    paragraph={compLoaderData ? compLoaderData.CallBack_subtitle_Ru : ""}*/}
//             {/*    >*/}
//             {/*        <ComponentLoader data={callBack_api} data_setter={setCompLoaderData}>*/}
//             {/*            <CallBackModal*/}
//             {/*            backImg={compLoaderData ? compLoaderData.BackImage : ""}*/}
//             {/*            actPhone={compLoaderData ? compLoaderData.Phone_Num_Ru : ""}/>    */}
//             {/*        </ComponentLoader>        */}
//             {/*</PopUpBase>*/}
//         </>
//     )
// }
//
//
//
//
