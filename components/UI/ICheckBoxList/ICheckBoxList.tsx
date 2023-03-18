import React, { FC, useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import styles from "./checkBoxList.module.scss";

type ICheckBoxItem = {
  isActive: boolean;
  fieldName: string;
  checkBox: boolean;
  onCheck?: (...props: any) => any;
  onRevoke?: (...props: any) => any;
};

interface ICheckBoxList {
  title: string;
  isOpened: boolean;
  fields: Array<ICheckBoxItem>;
}

const ICheckBoxList: FC<ICheckBoxList> = ({ title, isOpened, fields }) => {
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
            openedFilterForMobile
              ? styles.activeFiltersMobiles
              : styles.inActiveFiltersMobiles
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
