import styles from "../../../styles/AttachPage.module.css"
import Image from "next/image"

import InputContext from "../../Context/InputStateContextAP"
import { useState, useEffect, useReducer, useCallback} from "react"

import MainLabel from "../../MainLabel"
import ATContentBlock from "./APContentBlock"
import APAttachBlock from "./APAttachBlock"
import InputItem from "./InputItem"
import PopUpBase from "../../PopUpBase"
import FilesAndDataSent from "../../ModalComponents/FIlesAndDataSent"

function statusChanger(arr, satatus){
    let negStatus = -1;

    for(let i = 0; i < arr.length; i++){
        if(arr[i] === !satatus){
            negStatus = i
        }
    }
 
    if(arr.length >= 0 && negStatus === -1){
        arr.push(satatus); 
    }

    if(negStatus >= 0){
        arr.splice(negStatus, 1, satatus);
    }

    return arr
}

export default function AttachPage(){

    const ADD_STATE_BP = "AddState"
    const SET_ENUM_BP = "setENum"
    const FILLED_CHECK = "FILLED_CHECK"
    
    const[puState, setPU] = useState(false);
    const[fileAttached, setAttach] = useState(false);

    // FOR S_SCREEN 
    const[unwrapForms, setUnwrap] = useState(true);

    
    const[formsFilled, dispatch] = useReducer(reducer, {
        ElemNum: 0,
        ElemsState: [],
        Filled: false
    });

    function reducer(state, action){
        switch(action.type){
            case ADD_STATE_BP:
                return{
                    ...state,
                    ElemsState: statusChanger([...state.ElemsState], action.payload)
                }
            case SET_ENUM_BP:
                return{
                    ...state,
                    ElemNum: action.payload,
                }
            case FILLED_CHECK:
                return{
                    ...state,
                    Filled: action.payload
                }
        }
    }


    const AddStateGenerator = (payload) => {
        return{
            type: ADD_STATE_BP,
            payload
        }
    }

    const SetENumGenerator = (payload) => {
        return{
            type: SET_ENUM_BP,
            payload
        }
    }

    const FilledCheckGenerator = (payload) => {
        return{
            type: FILLED_CHECK,
            payload
        }
    }



    // SHOW/HIDE SEND USER DATA BLOCK
    useEffect(()=>{
        const SendForm = document.querySelector(`.${styles.APSendFormParent}`);
        let timer;

        if((!fileAttached || !formsFilled.Filled) && !(SendForm.classList.contains(`${styles.active}`))){
            //HIDE
            SendForm.className += ` ${styles.active}`;
            timer = setTimeout(()=>{
                SendForm.style.display = "none";
            }, 350)
        }

        if(fileAttached && formsFilled.Filled && SendForm.classList.contains(`${styles.active}`)){
            SendForm.style.display = "block";
            //SHOW
            timer = setTimeout(()=>{
                SendForm.classList.remove(`${styles.active}`);
            }, 100)

        }

        return () => {
            clearTimeout(timer);
          };

    },[fileAttached, formsFilled.Filled])

    useEffect(()=>{
        const SendForm = document.querySelector(`.${styles.APSendFormParent}`);

        if(window.innerHeight < 810){
            if(unwrapForms && (formsFilled.Filled || !formsFilled.Filled)){
                SendForm.style.display = "none";
            }
            else if(!unwrapForms && (formsFilled.Filled || !formsFilled.Filled)){
                SendForm.style.display = "block";
            }
        }

    }, [unwrapForms, formsFilled.Filled]);

    // CHECKING ALL FIELDS ARE FILLED
    useEffect(()=>{
        
        if(formsFilled.ElemsState.some((x)=> x === false)){
            dispatch(FilledCheckGenerator(false))
        }
        else{
            dispatch(FilledCheckGenerator(true))
        }

    },[formsFilled.ElemsState])


    // //HIDE/SHOW FORMS FOR S-SCREENS ------------------------------
    const FormsUnwrapper = useCallback(event => {
        const {type} = event;

        if((type === "mouseenter" || type === undefined) ){
            setUnwrap(true);
        }
        else if(type === "mouseleave"){
            setTimeout(() => setUnwrap(false), 500)
        }
    },[]);
    
    
    useEffect(()=>{
        const LState = formsFilled.Filled;
        const Inputs = document.querySelector(`.${styles.UserInputBlockParent}`);
        
        if(LState){
            Inputs.className += ` ${styles.active}`;
            console.log(LState)
        }

    },[formsFilled.Filled])

    useEffect(()=>{
        const Inputs = document.querySelector(`.${styles.UserInputBlockParent}`);
        const L_FF = formsFilled.Filled;

        Inputs.addEventListener("mouseenter", FormsUnwrapper);
        Inputs.addEventListener("mouseleave", FormsUnwrapper);

        if(unwrapForms && Inputs.classList.contains(`${styles.active}`)){
            Inputs.classList.remove(`${styles.active}`);
        }
        else if(!unwrapForms && !Inputs.classList.contains(`${styles.active}`) && L_FF){
            Inputs.className += ` ${styles.active}`;
        }

        return() => {
            Inputs.removeEventListener("mouseenter", FormsUnwrapper);
            Inputs.removeEventListener("mouseleave", FormsUnwrapper);
        }
    },[FormsUnwrapper, unwrapForms, formsFilled.Filled]);

    // --------------------------------------------------------------

    // SET NUM OF INPUT`S (FIRST LOAD. [6 INPUTS = NUM: 6])
    //+ GET SEND FORM ELEMENT
    useEffect(()=>{
        const InputForms = document.querySelector(".qSelectIputForms").childElementCount;
        dispatch(SetENumGenerator(InputForms));
        console.log(InputForms);
    },[])



    return(
        <>
                <div className={styles.AttachContent}>
                    <div className={styles.LeftContent}>
                        <div className={styles.AttachMLabel}>
                            <MainLabel padding={"130px"}>
                            ГОТОВЫ ИЗГОТАВЛИВАТЬ
                            СЛОЖНЫЕ ДЕТАЛИ ПО
                            ВАШИМ ЧЕРТЕЖАМ И
                            ЭСКИЗАМ 
                            </MainLabel>
                        </div>
                        
                        <div className={styles.AttachBlockParent}>
                            <ATContentBlock StepNum={1}>
                                <APAttachBlock
                                setAttached={setAttach}/>
                            </ATContentBlock>
                        </div>

                    </div>
                    
                    <div className={styles.RightContent}>

                    <div className={styles.UserInputBlockParent}>
                        <ATContentBlock StepNum={2}>

                                <div className={styles.ABContainerInput}>   

                                    <div className={styles.ABHeaderInput}>
                                        <p>Регистрация:</p>
                                        <a>Уже зарегистрирован...</a>
                                    </div>
                                    
                                    <div className={styles.InputBlockLimiter}>
                                    <div className="qSelectIputForms">
                                        <InputContext.Provider value={{dispatch, AddStateGenerator}}>
                                            <InputItem Title={"ИНН Организации"} Placeholder={"1111111111"}/>
                                            <InputItem Title={"Название компании"} Placeholder={"ОТИС Лифт"}/>
                                            <InputItem Title={"ФИО представителя"} Placeholder={"Андреев Андрей Андреевич"}/>
                                            <InputItem Title={"Должность представителя"} Placeholder={"Менеджер по закупкам"}/>
                                            <InputItem Title={"Контактный телефон"} Placeholder={"+7(000)000 00 00"}/>
                                            <InputItem Title={"Email"} Placeholder={"info@istlift.ru"}/>
                                        </InputContext.Provider>
                                    </div>
                                    </div>
                                </div>
                            </ATContentBlock>
                        </div>

                        <div className={styles.APSendFormParent}>
                            <ATContentBlock StepNum={3}>
                                <div className={styles.ABContainerSendForm}>   

                                <div className={styles.ABsendRules}>
                                    <p>
                                        Перед тем, как отправить файл убедительная просьба
                                        ознакомиться с нашими условиями продажи товаров, 
                                        а так же с условиями подготовки файлов для отправки с
                                        целью дальнейшего изготовления деталей.
                                    </p>

                                    <div className={styles.ABsendBtnConteiner}>
                                        <button onClick={()=>setPU(true)}>
                                            Отправить
                                        </button>
                                    </div>

                                </div>
                                


                                </div>
                            </ATContentBlock>
                        </div>

                    </div>     

                <div className={styles.AttachContentBg}>
                    <Image
                        src={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1645799192/AttachPageImages/Rectangle_23_rv90lv.png"}
                        width={1452}
                        height={1000}
                        layout="fixed"
                        />
                </div>  

                </div>

            <PopUpBase puState={puState} closer={setPU}
            header="Спасибо за сотрудничество!"
            paragraph="Мы получили ваши данные и скоро свяжемся с вами">
                <FilesAndDataSent
                backImg={"https://res.cloudinary.com/dv9xitsjg/image/upload/v1645799192/AttachPageImages/Rectangle_23_rv90lv.png"}
                w={1920}
                h={1147}
                />
            </PopUpBase>
        </>
    )
}