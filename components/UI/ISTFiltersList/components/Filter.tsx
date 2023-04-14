import React, {FC, useState} from "react";
import styles from "../styles/filtersList.module.scss";
import { maxLengthText } from "../../common";
import {ICheckBoxItem} from "../common";

const Filter:FC<ICheckBoxItem> = ({
  fieldName,
  isActive,
  switchActiveState,
  isCheckBox
}) => {

  const MAX_FIELD_LENGTH = 23;

  const [describing, setDescribing] = useState<boolean>(false);


  const activeDescribing = () => {
    const device = navigator.userAgent.match(
      /iPhone|iPad|iPod|Android|BlackBerry|Opera Min|IEMobile/i
    );

    if (device === null) {
      if (fieldName?.length >= MAX_FIELD_LENGTH) {
        setDescribing(true);
      }
    } else {
      return;
    }
  };

  const hideDescribing = () => {
    setDescribing(false);
  };

  return (
    <div
      className={`${styles.filter}`}
      onClick={switchActiveState}
      onMouseEnter={activeDescribing}
      onMouseLeave={hideDescribing}
    >
      <div className={styles.columnField}>
        <div
          className={`${styles.fieldName} ${
            isActive ? styles.activeText : ""
          }`}
        >
          {maxLengthText(fieldName, MAX_FIELD_LENGTH)}
        </div>
        {describing ? (
          <span className={styles.describingFilter}>{fieldName}</span>
        ) : null}
      </div>

      {isCheckBox ? (
        <div
          className={`${styles.checkPoint} ${isActive ? "" : styles.active}`}
        ></div>
      ) : null}

    </div>
  );
};

export default Filter;
