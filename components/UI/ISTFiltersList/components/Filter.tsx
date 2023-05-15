import React, {FC, useCallback, useEffect, useState} from "react";
import styles from "../styles/filtersList.module.scss";
import { maxLengthText } from "../../common";
import {ICheckBoxItem, IST_FilterItem} from "../common";
import {Properties} from "csstype";

const Filter:FC<IST_FilterItem> = ({
  fieldName,
  isActive,
  isCheckBox,
  idx,
  onFilterSwitch
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
      onClick={()=>{
        onFilterSwitch(idx)
      }}
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
          <span className={styles.describingFilter}>
            {fieldName}
          </span>
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
