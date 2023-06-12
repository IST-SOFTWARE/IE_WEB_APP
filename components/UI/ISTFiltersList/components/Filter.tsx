import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styles from "../styles/filtersList.module.scss";
import { maxLengthText } from "../../common";
import { ICheckBoxItem, IST_FilterItem } from "../common";
import { Properties } from "csstype";
import { devNull } from "os";

const Filter: FC<IST_FilterItem> = ({
  fieldName,
  isActive,
  isCheckBox,
  idx,
  onFilterSwitch,
}) => {
  const [describing, setDescribing] = useState<boolean>(false);
  const [maxFieldLength, setMaxFieldLength] = useState<number>(23);

  const device = navigator.userAgent.match(
    /iPhone|iPad|iPod|Android|BlackBerry|Opera Min|IEMobile/i
  );

  const activeDescribing = () => {
    if (device === null) {
      if (fieldName?.length >= maxFieldLength) {
        setDescribing(true);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (device !== null) setMaxFieldLength(0);
  }, []);

  const hideDescribing = () => {
    setDescribing(false);
  };

  return (
    <div
      className={`${styles.filter}`}
      onClick={() => {
        onFilterSwitch(idx);
      }}
      onMouseEnter={activeDescribing}
      onMouseLeave={hideDescribing}
    >
      <div className={styles.columnField}>
        <div
          className={`${styles.fieldName} ${isActive ? styles.activeText : ""}`}
        >
          {maxLengthText(fieldName, maxFieldLength)}
        </div>
        {describing ? (
          <span className={styles.describingFilter}>{fieldName}</span>
        ) : null}
      </div>

      {isCheckBox ? (
        <div
          className={`${styles.checkPoint} ${
            isActive ? styles.activeCheckBoxPoint : ""
          }`}
        >
          {isActive ? (
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMSAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC40MjI4NTIiIHk9IjAuOTQ3MjY2IiB3aWR0aD0iMTAuMTU0OCIgaGVpZ2h0PSIxMC4xNTQ4IiByeD0iMyIgZmlsbD0iIzhCQzJGRiIvPgo8L3N2Zz4K" />
          ) : (
            ""
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
