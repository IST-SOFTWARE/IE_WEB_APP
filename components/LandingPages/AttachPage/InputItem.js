import styles from "../../../styles/AttachPage.module.css"
import { useState, useEffect, useReducer, useContext} from "react"
import InputContext from "../../Context/InputStateContextAP";

export default function InputItem({Title, Placeholder, counter, setCount}){

    //BOILER PLATE`S
    const INPUT_BP = "Input";
    const FOCUS_BP = "focus";
    const CONFIRMED_BP = "Confirmed";
    

    const GlobalInputState = useContext(InputContext)

    //SHOW / HIDE INPUT
    const[showInput, setShowInput] = useState(true);
    
    //EDIT-FOCUSER
    const[focuser, setFocus] = useState(false);

    //INPUT BASE ELEMENT 
    const[state, dispatch] = useReducer(reducer,{
        Value: "",
        Focus: false,
        Form: {},
        Confirmed: true
    });

    //INPUT REDUSER
    function reducer(state, action){
        switch(action.type){
            case INPUT_BP:
                return{
                        Value: action.payload,
                        Focus: true,
                        Form: action.obj,
                        Confirmed: state.Confirmed
                }
            case FOCUS_BP:
                // console.log("focus");
                return{
                    Value: state.Value,
                    Focus: action.payload,
                    Form: action.obj,
                    Confirmed: state.Confirmed
                }
            case CONFIRMED_BP:
                return{
                    Value: state.Value,
                    Focus: state.Focus,
                    Form: state.Form,
                    Confirmed: action.payload
                }
        }
    }


    // -- [ACTION-GENERATOR`S] --
    const OnChangerGenerator = (event) => {
        return{
            type: INPUT_BP,
            payload: event.target.value,
            obj: event
        }
    };

    const OnFocusGenerator = (focus, obj) => {
        // console.log(obj.target);
        return{
            type: FOCUS_BP,
            payload: focus,
            obj: obj
        }
    }

    const setConfirmedGenerator = (conf) =>{
        return{
            type: CONFIRMED_BP,
            payload: conf
        }
    }
    // --[]--

    // BASE EVENTS LISTENER [FOCUSED, CONFIRMED]
    useEffect(()=>{
        if(state.Focus){
            state.Form.target.className = `${styles.ActiveInputForm}`;
            dispatch(setConfirmedGenerator(true));
        }
        else{
            if(state.Form.target !== undefined){
                if(state.Value.length > 0){
                    state.Form.target.classList.remove(`${styles.ActiveInputForm}`);
                    dispatch(setConfirmedGenerator(true));
                    setShowInput(false);
                    setFocus(false);
               } 

                if(state.Value.length === 0){
                    state.Form.target.classList.remove(`${styles.ActiveInputForm}`);
                    state.Form.target.className = `${styles.shouldBeFilled}`;
                    dispatch(setConfirmedGenerator(false));
                    setShowInput(true);
                } 
            }
        }
    }, [state.Value, state.Focus, state.Form])

    // HANDLER FOR EDIT
    function EditField(){
        setShowInput(true);
        setFocus(true)
    }

    // EDIT ? SET FOCUS
    useEffect(() => {
        if(state.Form.target !== undefined && state.Value.length > 0 && focuser){
            const EditElem = document.getElementById(`input_value_${state.Value}`)
            EditElem.focus();
        }
    },[focuser])

    useEffect(()=>{
        GlobalInputState.dispatch(GlobalInputState.AddStateGenerator(!showInput));
    }, [showInput])

    return(
        <>  
                <div className={styles.InputBlock}>
                    <label className =
                    {state.Confirmed ? null
                    : `${styles.isNotConfirmed}`}>

                        {Title + ":"}

                    </label>
                    
                    {showInput ?  
                    <input
                        id={`input_value_${state.Value}`}
                        value={state.Value}
                        onChange={(e) => dispatch(OnChangerGenerator(e))}
                        onFocus={(e) => dispatch(OnFocusGenerator(true, e))}
                        onBlur={(e) => dispatch(OnFocusGenerator(false, e))}
                        type="text"
                        placeholder={Placeholder}
                    >
                    </input>
                    :
    
                    <p className={styles.ConfirmedInputData}
                    onClick={() => EditField()}>
                        {state.Value}
                    </p>
    
                    }
                </div>

        </>
    )
}