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
  hookedData,

  onFilterSwitch
}) => {

  const MAX_FIELD_LENGTH = 23;
  const [describing, setDescribing] = useState<boolean>(false);

  const switchState = useCallback(()=>{
    let filters: ICheckBoxItem[] = [];
    let editingFilter = {} as
        Parameters<typeof onFilterSwitch>

    if(!hookedData || !hookedData.fields || !hookedData.fieldsSetter)
      return

    filters = [...hookedData.fields]

    filters.map(el => {
      if(el.idx === idx){
        const nState = !el.isActive;

        filters[idx] = {
          ...el,
          isActive: nState
        }

        editingFilter = [
            idx,
            nState,
            el.fieldName ?
                el.fieldName : ""
        ];
      }
    })

    if(onFilterSwitch)
      onFilterSwitch(...editingFilter);

    hookedData.fieldsSetter(filters);

  },[hookedData, onFilterSwitch])

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
        switchState()
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
