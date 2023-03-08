import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { modalStater } from "../../../Hooks/baseModal/modalSetter";
import styles from "../../../styles/Modals/catalog/catalogWrapper.module.scss";
import { useRouter } from "next/router";
import { useCatalog } from "../../Catalog/useCatalog";
import ISTProductItem from "../../UI/ISTProductItem/ISTProductItem";
import ICheckBoxList from "../../UI/ICheckBoxList/ICheckBoxList";

interface catalogWrapper {
  data: modalStater;
}

const CatalogWrapperModal: FC<catalogWrapper> = ({ data }) => {
  const { closeCatalog } = useCatalog({});

  return (
    <>
      <div className={styles.catalog_wrapper}>
        <div className={"container"}>
          <div
            className={"row"}
            style={{
              border: "solid 1px red",
            }}
          >
            <button onClick={() => closeCatalog()}>Close</button>
          </div>
          <div
            className={"row h-100"}
            style={{
              border: "solid 1px blue",
            }}
          >
            {/*Filters bock*/}
            <div className={"col-md-5 col-xl-4 position-relative p-0"}>
              <div
                className={"col-md-4 col-xl-3 position-fixed p-0"}
                style={{
                  border: "solid 1px yellow",
                  minHeight: "50px",
                  marginTop: "10px",
                  maxWidth: "370px",
                }}
              >
                <ICheckBoxList
                  title={"производители"}
                  isOpened={true}
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

            {/*Products bock*/}
            <div
              className={
                "col-md-7 col-xl-8 d-flex flex-wrap align-self-start justify-content-lg-around justify-content-xl-between h-100"
              }
            >
              {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return (
                  <ISTProductItem
                    key={`productItem_${i}_key`}
                    id={i}
                    title={"Product Item"}
                    price={"200"}
                    style={{
                      margin: "10px 0px",
                      inline: false,
                    }}
                    vendCode={"IST 000001"}
                    currency={"RU"}
                  />
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogWrapperModal;