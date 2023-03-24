import React, { FC, useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import styles from "./checkBoxList.module.scss";

type mobileOpenType_dropdown = "dropdown"
type mobileOpenType_transfer = "transfer"

type ICheckBoxItem = {
  isActive: boolean;
  checkBox: boolean;
  fieldName: string;
  onCheck?: (...props: any) => any;
  onRevoke?: (...props: any) => any;
};



type mobileSettings = {
  type: mobileOpenType_dropdown | mobileOpenType_transfer,
  mobileListTransfer: typeof this.type extends
      mobileOpenType_dropdown ? null
      : React.Dispatch<ICheckBoxItem[]>

}

interface ICheckBoxList
{
  title: string;
  isOpened: boolean;
  fields: Array<ICheckBoxItem>;
  mobileSettings?: mobileSettings
}


const ICheckBoxList:FC<ICheckBoxList> = ({ title, isOpened, fields, mobileSettings }) => {
  const [hasFields, setHasFields] = useState(fields); // лист фильтров
  const [opened, setOpened] = useState(isOpened); //откртие/закрытие списков фильтров
  const [openedFilterForMobile, setOpenedFilterForMobile] = useState(false);
  const [hasFilters, setHasFilters] = useState([]); // когда hasFilters.length больше 0 рисуется "точка"

  const dotAddAction = () => {
    setHasFilters([...hasFilters, 1]);
  };

  const deleteDotAction = () => {
    setHasFilters([...hasFilters.slice(1)]);
  };

  useEffect(() => {
    setHasFields(fields);
  }, [fields]);

  const openFiltersField = () => {
    opened ? setOpened(false) : setOpened(true);
    openedFilterForMobile
      ? setOpenedFilterForMobile(false)
      : setOpenedFilterForMobile(true);
  };

  const closeFiltersField = () => {
    setOpenedFilterForMobile(false);
    setTimeout(() => {
      setOpened(false);
    }, 200);
  };

  return (
    <div className={`${styles.container}`}>
      {hasFilters.length > 0 && <div className={styles.dot}></div>}
      <div
        className={`${styles.title} 
      ${hasFilters.length > 0 ? styles.titleTransition : null}`}
        onClick={openFiltersField}
      >
        {title}
        <div
          className={`${styles.vector} ${opened ? styles.active : null}`}
        ></div>
      </div>
      {opened ? (
        <div
          className={`${styles.filters}
          ${
            window.screen.width <= 576 &&
            (openedFilterForMobile
              ? styles.activeFiltersMobiles
              : styles.inActiveFiltersMobiles)
          }`}
        >
          {window.screen.width <= 576 && (
            <div
              onClick={closeFiltersField}
              className={`${styles.titleMobileFilter} ${styles.vectorTitle}`}
            >
              {title}
            </div>
          )}
          {hasFields.map((filter, index) => {
            return (
              <Filter
                field={filter}
                dotAction={dotAddAction}
                deleteDotAction={deleteDotAction}
                key={`filterItem_${index}_key`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ICheckBoxList;
