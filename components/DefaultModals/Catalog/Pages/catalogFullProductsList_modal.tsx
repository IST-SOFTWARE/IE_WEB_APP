import React, { useState } from "react";
import styles from "../../../../styles/Modals/catalog/catalogProducts/catalogFullProductsList.module.scss";

import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";

import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../UI/ISTFiltersList/hook/useISTFiltersList";

const CatalogFullProductsListModal = ({}) => {

    const[mfg_filter, mfg_active] = useISTFiltersList();
    const[types_filter, types_active] = useISTFiltersList();
    const[units_filter, units_active] = useISTFiltersList();

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

        {/*Производители*/}

            <ISTFiltersWrapper
                title={"Производители"}
                isOpened={true}
                hasActives={mfg_active}
                mobileSettings={{
                    onTransfer: ()=>{},
                    type: "transfer",
                    mobileSizeTrigger: "LG_992"
                }}
            >

                <ISTFiltersList fields={[
                    {isActive: false, fieldName: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                        isCheckBox: true},
                    {isActive: false, fieldName: "Field 2", isCheckBox: true},
                    {isActive: false, fieldName: "Field 3", isCheckBox: true},
                    {isActive: false, fieldName: "Field 4", isCheckBox: true},
                ]}
                    hookedData={mfg_filter}
                />
            </ISTFiltersWrapper>

        {/*Типы*/}

            <ISTFiltersWrapper
                title={"Типы"}
                isOpened={false}
                hasActives={types_active}
                mobileSettings={{
                    onTransfer: ()=>{},
                    type: "transfer",
                    mobileSizeTrigger: "LG_992"
                }}
            >

                <ISTFiltersList fields={[
                    {isActive: false, fieldName: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                        isCheckBox: true},
                    {isActive: false, fieldName: "Field 2", isCheckBox: true},
                    {isActive: false, fieldName: "Field 3", isCheckBox: true},
                    {isActive: false, fieldName: "Field 4", isCheckBox: true},
                ]}

                    hookedData={types_filter}
                />
            </ISTFiltersWrapper>

        {/*Узлы*/}

            <ISTFiltersWrapper
                title={"Узлы"}
                isOpened={false}
                hasActives={units_active}
                mobileSettings={{
                    onTransfer: ()=>{},
                    type: "transfer",
                    mobileSizeTrigger: "LG_992"
                }}
            >

                <ISTFiltersList fields={[
                    {isActive: false, fieldName: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                        isCheckBox: true},
                    {isActive: false, fieldName: "Field 2", isCheckBox: true},
                    {isActive: false, fieldName: "Field 3", isCheckBox: true},
                    {isActive: false, fieldName: "Field 4", isCheckBox: true},
                ]}
                    hookedData={units_filter}
                />
            </ISTFiltersWrapper>


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
