import React, { FC, useEffect, useState } from "react";
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
  const [opened, setOpened] = useState(isOpened); //откртие/закрытие списко фильтров
  const [hasFilters, setHasFilters] = useState([]); // когда hasFilters.length больше 0 рисуется "точка"

  useEffect(() => {
    setHasFields(fields);
  }, [fields]);

  const openFiltersField = () => {
    opened ? setOpened(false) : setOpened(true);
  };

  return (
    <div className={styles.container}>
      {hasFilters.length > 0 && <span className={styles.dot}></span>}
      <div className={styles.title} onClick={openFiltersField}>
        {title}
        <div
          className={`${styles.vector} ${opened ? styles.active : null}`}
        ></div>
      </div>
      {opened ? (
        <div className={styles.filters}>
          {hasFields.map((filter, index) => {
            return <Filter field={filter} key={`filterItem_${index}_key`} />;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ICheckBoxList;
