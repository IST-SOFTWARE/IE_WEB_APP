import styles from "./index.module.scss";
import { useEffect, useState, useReducer, FC } from "react";

interface quentityEditor {
  clickEvent: (...props: any) => any;
  value: any;
}

const QuantityEditor: FC<quentityEditor> = ({ clickEvent, value }) => {

  // const Inc_BP = "increment";
  // const Decr_BP = "decrement";
  // const Input_BP = "input";

  // const k = 1; // INC/DEC
  // const maxQ = 10; // Max Quantity for one product position

  // const [isFocus, setFocus] = useState(false);
  const [inputVal, setInputVal] = useState(value);

  // const [state, dispatch] = useReducer(reducer, {
  //   quantity: value,
  // });

  // const QuentityGetter = () => {
  //   if (clickEvent !== undefined) {
  //     clickEvent(state.quantity);
  //   }
  // };

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case Inc_BP:
  //       return {
  //         quantity: state.quantity + action.payload,
  //       };
  //     case Decr_BP:
  //       return {
  //         quantity: state.quantity - action.payload,
  //       };
  //     case Input_BP:
  //       return {
  //         quantity: parseInt(action.payload),
  //       };
  //   }
  // }

  // const Increment_AG = (payload) => ({
  //   type: Inc_BP,
  //   payload,
  // });

  // const Decrement_AG = (payload) => ({
  //   type: Decr_BP,
  //   payload,
  // });

  // const Input_AG = (payload) => ({
  //   type: Input_BP,
  //   payload,
  // });

  // function validate(evt) {
  //   var theEvent = evt || window.event;
  //   var key = theEvent.keyCode || theEvent.which;
  //   key = String.fromCharCode(key);
  //   var regex = /[0-9]|\./;
  //   if (!regex.test(key)) {
  //     theEvent.returnValue = false;
  //     if (theEvent.preventDefault) theEvent.preventDefault();
  //   }
  // }

  // useEffect(() => {
  //   // NaN IN INPUT HANDLER
  //   if (isNaN(parseInt(inputVal)) && !isFocus) {
  //     dispatch(Input_AG(1));
  //   } else if (!isNaN(parseInt(inputVal)) && !isFocus) {
  //     dispatch(Input_AG(inputVal));
  //   }

  //   // < 0 && > MAX QUANTITY IN INPUT HANDLER
  //   if (inputVal <= 0 && !isFocus) {
  //     dispatch(Input_AG(1));
  //   } else if (inputVal > maxQ && !isFocus) {
  //     dispatch(Input_AG(maxQ));
  //   }
  //   // console.log("SQ: ", state.quantity, "IV: ", inputVal);
  // }, [inputVal, isFocus]);

  // useEffect(() => {
  //   if (value && value !== null) {
  //     setInputVal(state.quantity);
  //     if ({ ...state } !== state) QuentityGetter();
  //   }
  // }, [state]);

  return (
    <>
      <div className={styles.QuantityEditor}>
        <div className={styles.ActionsContainer}>
          <button
            className={styles.lButton}
            // onClick={() => {
            //   dispatch(Decrement_AG(k));
            // }}
          >
            -
          </button>

          <input
            type="text"
            // value={inputVal}
            // onKeyPress={(e) => validate(e)}
            // onChange={(e) => setInputVal(e.target.value)}
            // onFocus={() => setFocus(true)}
            // onBlur={() => setFocus(false)}
          />

          <button
            className={styles.rButton}
            // onClick={() => {
            //   dispatch(Increment_AG(k));
            // }}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default QuantityEditor;
