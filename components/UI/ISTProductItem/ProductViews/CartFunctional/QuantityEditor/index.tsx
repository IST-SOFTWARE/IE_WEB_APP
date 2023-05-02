import styles from "./index.module.scss";
import {
  useEffect,
  useState,
  useReducer,
  FC,
  Dispatch,
  useCallback,
  useRef,
} from "react";

interface quentityEditor {
  quantity: number;
  onChange?: (...props: any) => any;
}

const QuantityEditor: FC<quentityEditor> = ({ onChange, quantity }) => {
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);

  const maxValue = 99;
  const input = useRef<HTMLInputElement>();

  const increment = useCallback(() => {
    const newValue = currentQuantity + 1;
    checkValue(newValue) ? setCurrentQuantity(newValue) : null;
    if(onChange) {
      onChange(currentQuantity)
    }
  }, [currentQuantity, onChange]);

  const decrement = useCallback(() => {
    const newValue = currentQuantity - 1;
    checkValue(newValue) ? setCurrentQuantity(newValue) : null;
    if(onChange) {
      onChange(currentQuantity)
    }
  },[currentQuantity, onChange]);

  const checkValue = (value: number): boolean => {
    if (value > 0 && value <= maxValue) {
      return true;
    }
    return false;
  };

  const handleValue = (value: number) => {
    if (value) {
      checkValue(Number(value))
        ? setCurrentQuantity(Number(value))
        : setCurrentQuantity(maxValue);
    }
  };

  return (
    <>
      <div className={styles.QuantityEditor}>
        <div className={styles.ActionsContainer}>
          <button className={styles.lButton} onClick={decrement}>
            -
          </button>

          <input
            type="number"
            onChange={(event) => {
              handleValue(Number(event.target.value));
            }}
            onBlur={() => {
              onChange(currentQuantity)
            }}
            value={currentQuantity}
            ref={input}
          />

          <button className={styles.rButton} onClick={increment}>
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default QuantityEditor;
