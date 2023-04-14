import React, { useState } from "react";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import styles from "../../../../styles/Modals/catalog/catalogProducts/catalogFullProductsList.module.scss";
import ICatalogHelper from "../../../UI/ICatalogHelper/ICatalogHelper";

const CatalogFullProductsListModal = ({}) => {
  const [opened, setOpened] = useState(false); //откртие/закрытие списко фильтров

  const openFilters = () => {
    opened ? setOpened(false) : setOpened(true);
  };



  return (
    <>
      {/*Filters bock*/}
      <div className={"col-4 position-relative p-0 d-none d-lg-flex"}
           style={{
               border: "solid 1px yellow",
           }}
      >
        <div
            className={styles.catalogFilter_Block}
        >
          {/*<ICheckBoxList*/}
          {/*  title={"производители"}*/}
          {/*  isOpened={false}*/}
          {/*  fields={[*/}
          {/*    {*/}
          {/*      isActive: false,*/}
          {/*      fieldName:*/}
          {/*        "фильтр 1 с большим описанием. Этот фильтр сделан для тестирования длинны текста фильтра, а так же для тестирования окна полного описания фильтра. Если длинна названия фильтра менее задaнной величины (23 символа) окно с полным описанием выводиться не будет.",*/}
          {/*      isCheckBox: true,*/}
          {/*    },*/}
          {/*    { isActive: false, fieldName: "фильтр 2", isCheckBox: true },*/}
          {/*    { isActive: false, fieldName: "фильтр 3", isCheckBox: true },*/}
          {/*    { isActive: false, fieldName: "фильтр 4", isCheckBox: true },*/}
          {/*  ]}*/}
          {/*  mobileSettings={{*/}
          {/*      type: "transfer",*/}
          {/*      mobileListTransfer: undefined*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
      </div>

    {/*Products bock*/}

       <div className={"col-12 col-lg-8 p-0 pl-lg-2 d-flex flex-wrap h-100"}
            style={{
                border: "solid 1px red",
            }}
       >
        {new Array(10).fill("").map((el, i) => {
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
                  inline: false,
                }}
                vendCode={"IST 000001"}
                currency={"RU"}
              />
            </div>
          );
        })}
      </div>

    </>
  );
};

export default CatalogFullProductsListModal;
