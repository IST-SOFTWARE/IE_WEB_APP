import React, { useState } from "react";
import styles from "../../../../../styles/Modals/catalog/mobile/catalogMobileFilterPage_modal.module.scss";
import ICheckBoxList from "../../../../UI/ISTFiltersList/ICheckBoxList";

const CatalogMobileFilterPageModal = ({ closeMobileFilter }) => {
  const [opened, setOpened] = useState(false); //откртие/закрытие списко фильтров
  return (
    <div className={styles.container}>
      <div
        className={`${styles.mobileVersionFilters} ${
          opened ? styles.active : null
        }`}
      >
        <div className={`${styles.header}`}>
          <div className={styles.title}>Фильтры</div>
          <div
            className={`${styles.vector} ${opened ? styles.active : null}`}
          ></div>
        </div>
        <div
          className={`${styles.filtersItems} ${opened ? styles.active : null} `}
        >
          <ICheckBoxList
            title={"производители"}
            isOpened={false}
            fields={[
              {
                isActive: false,
                fieldName:
                  "фильтр 1 с большим описанием. Этот фильтр сделан для тестирования длинны текста фильтра, а так же для тестирования окна полного описания фильтра. Если длинна названия фильтра менее задaнной величины (23 символа) окно с полным описанием выводиться не будет.",
                checkBox: true,
              },
              { isActive: false, fieldName: "фильтр 2", checkBox: true },
              { isActive: false, fieldName: "фильтр 3", checkBox: true },
              { isActive: false, fieldName: "фильтр 4", checkBox: true },
            ]}
          />
          <ICheckBoxList
            title={"производители 123"}
            isOpened={false}
            fields={[
              {
                isActive: false,
                fieldName: "фильтр 1 с большим описанием. Этот ",
                checkBox: true,
              },
              { isActive: false, fieldName: "фильтр 2", checkBox: true },
              { isActive: false, fieldName: "фильтр 3", checkBox: true },
              { isActive: false, fieldName: "фильтр 4", checkBox: true },
            ]}
          />
        </div>
      </div>

      <button onClick={closeMobileFilter}>CLOSE FILTER CATALOG MOBILE</button>
    </div>
  );
};

export default CatalogMobileFilterPageModal;
