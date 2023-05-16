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
import cart from "./cart.svg";
import Image from "next/image";

interface quentityEditor {
  quantity: number;
  onChange?: (quantity: number) => void;
  onDelete?: () => void;
}

const QuantityEditor: FC<quentityEditor> = ({
  onChange,
  quantity,
  onDelete,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);

  const maxValue = 99;
  const input = useRef<HTMLInputElement>();

  const increment = useCallback(() => {
    const newValue = currentQuantity + 1;
    if (!checkValue(newValue)) return null;
    setCurrentQuantity(newValue);
    onChange(newValue);
  }, [currentQuantity, onChange]);

  const decrement = useCallback(() => {
    const newValue = currentQuantity - 1;
    if (!checkValue(newValue)) return null;
    setCurrentQuantity(newValue);
    onChange(newValue);
  }, [currentQuantity, onChange]);

  const checkValue = (value: number): boolean => {
    if (value >= 1 && value <= maxValue) {
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
          {Number(currentQuantity) <= 1 ? (
            <button className={styles.lButton_blue} onClick={onDelete}>
              <Image
                alt="Product Item Image"
                src={cart}
                width={18}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  paddingBottom: "2px",
                }}
              />
            </button>
          ) : (
            <button className={styles.lButton} onClick={decrement}>
              -
            </button>
          )}

          <input
            type="number"
            onChange={(event) => {
              handleValue(Number(event.target.value));
            }}
            onBlur={() => {
              onChange(currentQuantity);
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
