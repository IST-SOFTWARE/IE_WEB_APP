import React, { useState } from "react";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import ICheckBoxList from "../../../UI/ICheckBoxList/ICheckBoxList";
import styles from "../../../../styles/Modals/catalog/catalogProducts/catalogFullProductsList.module.scss";

const CatalogFullProductsListModal = ({}) => {
  const [opened, setOpened] = useState(false); //откртие/закрытие списко фильтров
  const openFilters = () => {
    opened ? setOpened(false) : setOpened(true);
  };

  return (
    <>
      {/*Filters bock*/}

      {window.screen.width <= 576 ? (
        <div className={`col-12 ${styles.modileLayout}`}>
          <div
            className={`${styles.mobileVersionFilters} ${
              opened ? styles.active : null
            }`}
          >
            <div className={`${styles.header}`} onClick={openFilters}>
              <div className={styles.title}>Фильтры</div>
              <div
                className={`${styles.vector} ${opened ? styles.active : null}`}
              ></div>
            </div>
            <div
              className={`${styles.filtersItems} ${
                opened ? styles.active : null
              } `}
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
                    fieldName:
                      "фильтр 1 с большим описанием. Этот ",
                    checkBox: true,
                  },
                  { isActive: false, fieldName: "фильтр 2", checkBox: true },
                  { isActive: false, fieldName: "фильтр 3", checkBox: true },
                  { isActive: false, fieldName: "фильтр 4", checkBox: true },
                ]}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={"col-md-5 col-xl-4 position-relative p-0"}>
          <div
            className={`col-md-4 col-xl-3 position-fixed p-0 `}
            style={{
              border: "solid 1px yellow",
              minHeight: "50px",
              marginTop: "10px",
              maxWidth: "370px",
            }}
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
          </div>
        </div>
      )}

      {/*Products bock*/}
      {/* <div className={"col-md-7 col-xl-8 d-flex flex-wrap  h-100"}>
        {new Array(10).fill("").map((i) => {
          return (
            <div
              className={styles.productCardVariant_Block}
              key={`productItemCatalog_${i}_key`}
            >
              <ISTProductItem
                id={i}
                title={"Product Item"}
                price={"200"}
                style={{
                  margin: "10px 5px",
                  inline: false,
                }}
                vendCode={"IST 000001"}
                currency={"RU"}
              />
            </div>
          );
        })}
      </div> */}
    </>
  );
};

export default CatalogFullProductsListModal;
