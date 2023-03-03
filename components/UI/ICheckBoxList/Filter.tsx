import React, { useState } from "react";
import styles from "./checkBoxList.module.scss";
import { maxLengthText } from "../common";

const Filter = ({ field, dotAction, deleteDotAction }) => {
  const [hasCheked, setHasCheked] = useState(field.isActive);
  const [openDiscrabing, setOpenDiscrabing] = useState(false);

  const activeFilterCheck = () => {
    hasCheked ? setHasCheked(false) : setHasCheked(true);
    hasCheked ? deleteDotAction() : dotAction();
  };

  const activeDiscrabing = (e) => {
    if (field.fieldName?.length >= 23) {
      // setTimeout(() => {
      //   openDiscrabing ? setOpenDiscrabing(false) : setOpenDiscrabing(true);
      // }, 500);
      openDiscrabing ? setOpenDiscrabing(false) : setOpenDiscrabing(true);
    }
  };

  return (
    <div
      className={`${styles.filter}`}
      onClick={(e) => {
        activeFilterCheck;
      }}
      onMouseEnter={activeDiscrabing}
      onMouseLeave={(e) => {
        activeDiscrabing;
      }}
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
