import React, { useState } from "react";
import styles from "./checkBoxList.module.scss";
import { maxLengthText } from "../common";

const Filter = ({field, dotAction, deleteDotAction }) => {
  const [hasChecked, setHasChecked] = useState(field.isActive);
  const [openDescribing, setOpenDescribing] = useState(false);

  const activeFilterCheck = () => {
    hasChecked ? setHasChecked(false) : setHasChecked(true);
    hasChecked ? deleteDotAction() : dotAction();
  };

  const activeDescribing = () => {
    const device = navigator.userAgent.match(
      /iPhone|iPad|iPod|Android|BlackBerry|Opera Min|IEMobile/i
    );

    if (device === null) {
      if (field.fieldName?.length >= 23) {
        setOpenDescribing(true);
      }
    } else {
      return;
    }
  };

  const hideDescribing = () => {
    setOpenDescribing(false);
  };

  return (
    <div
      className={`${styles.filter}`}
      onClick={activeFilterCheck}
      onMouseEnter={activeDescribing}
      onMouseLeave={hideDescribing}
    >
      <div className={styles.columnField}>
        <div
          className={`${styles.fieldName} ${
            hasChecked ? styles.activeText : ""
          }`}
        >
          {maxLengthText(field.fieldName, 23)}
        </div>
        {openDescribing ? (
          <span className={styles.describingFilter}>{field.fieldName}</span>
        ) : null}
      </div>

      {field.checkBox ? (
        <div
          onClick={activeFilterCheck}
          className={`${styles.checkPoint} ${hasChecked ? "" : styles.active}`}
        ></div>
      ) : null}

    </div>
  );
};

export default Filter;
