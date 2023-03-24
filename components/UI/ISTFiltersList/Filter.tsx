import React, { useState } from "react";
import styles from "./checkBoxList.module.scss";
import { maxLengthText } from "../common";

const Filter = ({field, dotAction, deleteDotAction }) => {
  const [hasCheked, setHasCheked] = useState(field.isActive);
  const [openDiscrabing, setOpenDiscrabing] = useState(false);

  const activeFilterCheck = () => {
    hasCheked ? setHasCheked(false) : setHasCheked(true);
    hasCheked ? deleteDotAction() : dotAction();
  };

  const activeDiscrabing = () => {
    const device = navigator.userAgent.match(
      /iPhone|iPad|iPod|Android|BlackBerry|Opera Min|IEMobile/i
    );

    if (device === null) {
      if (field.fieldName?.length >= 23) {
        setOpenDiscrabing(true);
      }
    } else {
      return;
    }
  };

  const disactiveDiscrabing = () => {
    setOpenDiscrabing(false);
  };

  return (
    <div
      className={`${styles.filter}`}
      onClick={activeFilterCheck}
      onMouseEnter={activeDiscrabing}
      onMouseLeave={disactiveDiscrabing}
    >
      <div className={styles.columnField}>
        <div
          className={`${styles.fieldName} ${
            hasCheked ? styles.activeText : ""
          }`}
        >
          {maxLengthText(field.fieldName, 23)}
        </div>
        {openDiscrabing ? (
          <span className={styles.discrabingFilter}>{field.fieldName}</span>
        ) : null}
      </div>

      {field.checkBox ? (
        <div
          onClick={activeFilterCheck}
          className={`${styles.checkPoint} ${hasCheked ? "" : styles.active}`}
        ></div>
      ) : null}
    </div>
  );
};

export default Filter;
