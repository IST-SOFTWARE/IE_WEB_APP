import React, {FC, useCallback, useEffect, useState} from 'react';
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../UI/ISTFiltersList/hook/useISTFiltersList";
import {ICatalogFiltersType} from "../../../../store/slices/catalogSlice/catalogFiltersType";
import {onFilterSwitch_t} from "../../../UI/ISTFiltersList/common";
import {useDispatch} from "react-redux";
import {addNewFilter} from "../../../../store/slices/catalogSlice/catalogSlice";
import {ICartItem, ICartItem_properties} from "../../../UI/ISTProductItem/ICartTypes";
import {useAppSelector} from "../../../../Hooks/reduxSettings";
import {useQuery} from "@apollo/client";
import {GET_MFG_CATEGORY_LIST, ICategoryMFG_Q} from "../../../../queries/categories/MFG/mfgCategoryQuery";

const CatalogTestFiltersModal: FC = () => {

    const dispatch = useDispatch();
    const catalog = useAppSelector(state => state.catalog);
    const [firstFilter, firstActive] = useISTFiltersList()

    const {data} = useQuery<ICategoryMFG_Q>(
        GET_MFG_CATEGORY_LIST,
    )

    // useEffect(()=>{
    //     if(!data || !data?.manufacturer_category) return
    //
    //     firstFilter.fieldsSetter(
    //         data.manufacturer_category?.map(el=>{
    //             return({
    //                 fieldName: el.manufacturer_name,
    //                 isCheckBox: true,
    //                 isActive: catalog.filters.mfg?.indexOf(
    //                     el.manufacturer_name) > -1,
    //                 switchActiveState: (()=>{
    //                     handleClick(el.manufacturer_name, "mfg")
    //                 })
    //             })
    //         })
    //     )
    //
    // },[data, catalog])


    //
    // const getActiveFilters = (data: IST_HookedData): string[] => {
    //     const outData = [];
    //     if (data && data.fields)
    //         data.fields.map((el, i) => {
    //             if (el.isActive)
    //                 outData.push(el.fieldName);
    //         })
    //
    //     return outData;
    // }

    // const handleClick = useCallback((filter: string,
    //                                  key: keyof ICatalogFiltersType) => {
    //
    //     let filters: Array<string> =
    //
    //     const elIdx = filters.indexOf(filter);
    //     elIdx > -1 ? filters.splice(elIdx, 1) : filters.push(filter);
    //
    //     console.log("PROPS: ", filter, key, "out: ", filters);
    //
    //     dispatch(addNewFilter({
    //         key: key,
    //         filter: filters
    //     }))
    //
    // }, [firstFilter, catalog])

    // useEffect(()=>{
    //     console.log(firstFilter);
    // },[firstFilter])

    const switchFilter:onFilterSwitch_t = (idx, state, name) =>{
        console.log(idx, state, name);
    }

    return (
        <>
            <div
                style={{
                    width: "350px",
                    height: "450px"
                }}
            >

                <ISTFiltersWrapper
                    title={"FILTER TEST"}
                    isOpened={true}
                    hasActives={firstActive}
                    mobileSettings={{
                        type: "dropdown",
                        mobileSizeTrigger: "LG_992",
                    }}
                >
                    {data && data?.manufacturer_category ? (
                        <ISTFiltersList
                            fields={
                                data?.manufacturer_category?.map(el=>{
                                    return({
                                        fieldName: el.manufacturer_name,
                                        isCheckBox: true,
                                        isActive: false,
                                    })
                                })
                            }

                            hookedData={firstFilter}
                            onFilterSwitch={switchFilter}
                        />
                    ) : null}

                </ISTFiltersWrapper>

            </div>
        </>

    );
};

export default CatalogTestFiltersModal;