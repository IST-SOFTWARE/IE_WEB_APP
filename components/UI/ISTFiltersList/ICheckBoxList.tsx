import React, { FC, useEffect, useState } from "react";
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
  mobileListTransfer?: React.Dispatch<ICheckBoxItem[]>
}

interface ICheckBoxList
{
  title: string;
  isOpened: boolean;
  fields: Array<ICheckBoxItem>;
  mobileSettings?: mobileSettings
}


const ICheckBoxList:FC<ICheckBoxList> = ({
  title,
  isOpened,
  fields,
  mobileSettings
}) => {
  const [hasFields, setHasFields] = useState<ICheckBoxItem[]>(fields); // лист фильтров
  const [opened, setOpened] = useState<boolean>(isOpened); //откртие/закрытие списков фильтров
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
    <div className={`
      ${styles.container} 
      ${mobileSettings?.type === "transfer" ? styles.mobile_transfer : ""}`
    }>
      {hasFilters.length > 0 &&
          <div className={styles.dot}/>
      }
      <div
        className={`${styles.title}  
        ${hasFilters.length > 0 ? 
            styles.titleTransition 
            : null}`}
        onClick={openFiltersField}
      >
        {title}
      <div
        className={`${styles.vector} 
        ${opened ? styles.active : ""}`}
      />

      </div>
      {opened ? (
        <div className={styles.filters}>
          {hasFields.map((filter, index) => (
            <Filter
              field={filter}
              dotAction={dotAddAction}
              deleteDotAction={deleteDotAction}
              key={`filterItem_${index}_key`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ICheckBoxList;
