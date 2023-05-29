import React, {useCallback, useState} from "react";
import styles from "../../../../../styles/Modals/catalog/catalogProducts/catalogFullProductsList.module.scss";

import ISTProductItem from "../../../../UI/ISTProductItem/ISTProductItem";

import ISTFiltersList from "../../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTFiltersWrapper from "../../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../../UI/ISTFiltersList/hook/useISTFiltersList";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../../Hooks/reduxSettings";
import {useQuery} from "@apollo/client";
import {GET_MFG_CATEGORY_LIST, ICategoryMFG_Q} from "../../../../../queries/categories/MFG/mfgCategoryQuery";
import {onFilterSwitchCustom_t} from "../../../../UI/ISTFiltersList/common";
import {filterSetter_filtersHelper, isActiveNow_filtersHelper} from "../../../../../helpers/Catalog/filters";
import {addNewFilter} from "../../../../../store/slices/catalogSlice/catalogSlice";
import {ICatalogFiltersType} from "../../../../../store/slices/catalogSlice/catalogFiltersType";

const CatalogFullProductsListModal = ({}) => {

    // Filters state
    const[mfg_filter, mfg_active, mfg_designation] =
        useISTFiltersList<ICatalogFiltersType>(
     "mfg"
    );

    const[types_filter, types_active, types_designation] =
        useISTFiltersList<ICatalogFiltersType>(
            "type"
    );

    const[units_filter, units_active, units_designation] =
        useISTFiltersList<ICatalogFiltersType>(
        "unit"
    );

    // Filters query
    const {data} = useQuery<ICategoryMFG_Q>(
        GET_MFG_CATEGORY_LIST,
    )

    // Redux catalog state & dispatch
    const dispatch = useDispatch();
    const catalog = useAppSelector(state => state.catalog);

    // add/remove function (Catalog)
    const switchFilter: onFilterSwitchCustom_t<keyof ICatalogFiltersType> = useCallback((
        idx,
        state,
        name,
        options
    ) => {

        if(!catalog || !catalog.filters || !options)
            return

        const newFilters =
            filterSetter_filtersHelper(catalog.filters, options , name);

        dispatch(addNewFilter({
            key: options,
            filter: newFilters
        }))

    },[dispatch, catalog])


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
                    type: "dropdown",
                    mobileSizeTrigger: "LG_992"
                }}
            >
                <ISTFiltersList
                    fields={
                        data?.manufacturer_category?.map(el=>{
                            return({
                                fieldName: el.manufacturer_name,
                                isCheckBox: true,
                                isActive: isActiveNow_filtersHelper(
                                    catalog?.filters,
                                    "mfg",
                                    el.manufacturer_name),
                            })
                        })
                    }


                    hookedData={mfg_filter}

                    switcherOptions={{
                        onSwitch: switchFilter,
                        filterDesignation: mfg_designation
                    }}
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

                    switcherOptions={{
                        onSwitch: switchFilter,
                        filterDesignation: types_designation
                    }}
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

                    switcherOptions={{
                        onSwitch: switchFilter,
                        filterDesignation: units_designation
                    }}
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
                    currency={"RU"}
                    style={{
                        width: "200px"
                    }}
                    itemType={{
                     productType: "catalog",
                         parameters: {
                         inline: false,
                         cartStatus: true,
                     },
                     data: {
                        id: i,
                        title: "Product Item roduct Item roduct Item roduct Item",
                        price: "23467867242",
                        vendCode: "IST000001"
                     }
                    }}
                />

            </div>
          );
        })}
      </div>

    </>
  );
};

export default CatalogFullProductsListModal;
