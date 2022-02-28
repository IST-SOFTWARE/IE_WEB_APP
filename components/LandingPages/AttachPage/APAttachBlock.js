import { useState, useEffect, useCallback, useReducer} from "react"
import styles from "../../../styles/AttachPage.module.css"

import {useDropzone} from "react-dropzone"
import Image from "next/image"

export default function APAttachBlock(){

    const LoadFile = "LoadFile"
    const LoadRules = "LoadRules"

    const[ActualContent, setActual] = useState(LoadFile);
    const[ShowRules, setShow] = useState(false);


    const[fileState, dispatch] = useReducer(reduser, {
        fileLoad: false,
        fileName: ""
    });

    // ACTION GENERATOR: LoadFile
    const LoadFileGenerator = (payload) => ({
        type: LoadFile,
        payload,
    });

    // LOADED FILE DATA
    function reduser(state, action){
        switch(action.type){
            case LoadFile:
                return{
                    fileLoad: true,
                    fileName: action.payload
                }
        }
    }

    // DROP FILE LISTENER (+ FILE CHECKER)
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {

        if(acceptedFiles && acceptedFiles.length > 0){
            dispatch(LoadFileGenerator(acceptedFiles[0].name));           
        }

        let ErrorMsg = "";
        if(rejectedFiles && rejectedFiles.length > 1){
            alert("Too many files :( \nYou can only upload 1 (.zip/.rar) file!");
        }
        else if(rejectedFiles && rejectedFiles.length > 0){
            rejectedFiles.forEach(file => {
                ErrorMsg += file.file.name + ": " + file.errors[0].message + "\n"
            });
            alert(ErrorMsg);
        }
    }, [])

    //DROPZONE HOOK
    const{getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        multiple:false,
        accept: '.rar, .zip', 
        });

    // FILE LOAD/UNLOAD CONTENT CHANGER
    useEffect(()=>{

        if(fileState.fileLoad === true && !ShowRules){
            // File name display
            document.querySelector(`.${styles.ABDropBlockBtn}`).className += ` ${styles.active}`
        }
    }, [fileState, ShowRules])

    // LOAD/RULES BTN ACTIVATOR
    useEffect(() => {
        try{ 
            const activeBtn = document.getElementById(ActualContent);
            activeBtn.className = activeBtn.className + ` ${styles.active}`; 
        }
        catch{
            console.log("ATTACH PAGE(LANDING[3]): Сould not find item to activate(STATE) *Attach block");
        }
    }, [ActualContent])

    // SHOW RULES SETTER [13: [ShowRules, setShow] def:(false)]
    useEffect(() => {
        try{ 
            if(ActualContent === LoadFile){
                setShow(false);
            }
            else{
                setShow(true);
            }
        }
        catch{
            console.log("ATTACH PAGE(LANDING[3]): An error occurred while changing the state to display content in a block *Attach block");
        }
    }, [ActualContent])

    // DRAG FILE LISTENER
    useEffect(()=>{
        const DZElement = document.querySelector(`.${styles.ABDropBlock}`);
        if(isDragActive === true){
            DZElement.className += ` ${styles.active}`;
        }
        else{
            DZElement.classList.remove(`${styles.active}`);
        }
    },[isDragActive])

    // ATTACH/RULLES CLICK LISTENER
    const HandlerClick = useCallback((e) =>{
            if(e.target.id !== ActualContent){
            const activeBtn = document.getElementById(ActualContent);
            activeBtn.classList.remove(`${styles.active}`);

            setActual(e.target.id);
            }
    });

    // ATTACH LINKS GENERATOR   ex:[rules {link} rules]
    useEffect(() => {
        if(!ShowRules){
            let RulesLink = document.querySelector(".RulesLink").innerHTML;
            RulesLink = RulesLink.replace(/\{/gi, "<a id=" + LoadRules +">");
            RulesLink = RulesLink.replace(/\}/gi, "</a>");
            document.querySelector(".RulesLink").innerHTML = RulesLink;
        }
    }, [ShowRules, fileState]);


    
    return(
        <>
            <div className={styles.ABContainer}>

                {/* ATTACH BLOCK HEADER */}
                <div className={styles.ABHeader}>
                    <button
                    onClick={(e) => HandlerClick(e)}
                    className={styles.ABHeaderBtn} id={LoadFile}>
                        Загрузка файла
                    </button>

                    <button
                    onClick={(e) => HandlerClick(e)}
                    className={styles.ABHeaderBtn} id={LoadRules}>
                        Что отправлять?
                    </button>

                </div>


                <div className={styles.ABContent}>
                    {ShowRules === true ? 
                    //SHOW RULES
                    <div className={styles.ABRulesContent}>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                : 
                    //SHOW ATTACH
                    <div className={styles.ABDropContent}>

                        <div {...getRootProps()}>
                        <input {...getInputProps()}/>
                            <div className={styles.ABDropBlock}>
                                <div className={styles.ABDropBlockImg}>
                                    <Image
                                    src= {fileState.fileLoad === false ? "/DragAndDrop.svg" : "/LoadedFileImg.svg"}
                                    layout="fill"
                                    alt="Drop File"
                                    />
                                </div>
                            </div>
                            <div className={styles.ABDropBlockFileName}>
                                {fileState.fileName}
                            </div>
                        
                            <button className={styles.ABDropBlockBtn}>
                                {fileState.fileLoad === false ?
                                "Открыть файл" 
                                :
                                "Заменить файл"}
                            </button>
                        </div>

                        <div className={styles.ABDropInfo}>
                            <p className="RulesLink" onClick={(e) => HandlerClick(e)} id={LoadRules}>
                                {fileState.fileLoad === false ?
                                "Перед загрузкой советуем ознакомиться с {условиями формирования} файла для отправки"
                                :
                                "{Условия формирования файла для отправки}"
                                }
                            </p>
                        </div>
                    </div>
                    
                }
                </div>

            </div>
        </>
    )
}