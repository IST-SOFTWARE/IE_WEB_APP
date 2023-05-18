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
  const [currentQuantity, setCurrentQuantity] = useState<string>(quantity.toString());

  const maxValue:number = 99;
  const minValue: number = 1;

  const inputRef= useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setCurrentQuantity(quantity.toString());
  },[quantity])

  const increment = useCallback(() => {
    const newValue = quantity + 1;
    if (!checkValue(newValue)) return null;

    onChange(newValue);

  }, [quantity, onChange]);

  const decrement = useCallback(() => {
    const newValue = quantity - 1;
    if (!checkValue(newValue)) return null;

    onChange(newValue);

  }, [quantity, onChange]);

  const checkValue = (value: number): boolean => {
    return value >= minValue && value <= maxValue;
  };

  const handleValue = useCallback((value: number | string) => {
    if (value) {
      checkValue(Number(value))
        ? onChange(Number(value))
        : onChange(maxValue);
    }
    else
      onChange(minValue);

  },[onChange]);

  return (
    <>
      <div className={styles.QuantityEditor}>
        <div className={styles.ActionsContainer}>
          {Number(quantity) <= 1 ? (
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
            onChange={(event)=>
                setCurrentQuantity(event.target?.value)
            }

            onBlur={(event) => {
              handleValue(event.target?.value)
            }}

            value={currentQuantity}
            ref={inputRef}
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
