import React, {FC, useCallback, useEffect, useState} from 'react';
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../UI/ISTFiltersList/hook/useISTFiltersList";
import {ICatalogFiltersType} from "../../../../store/slices/catalogSlice/catalogFiltersType";
import {IST_HookedData, IST_IFilterItem, IST_IFiltersWrapper} from "../../../UI/ISTFiltersList/common";
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

    useEffect(()=>{
        if(!data || !data?.manufacturer_category || !catalog) return

        firstFilter.fieldsSetter(
            data.manufacturer_category?.map(el=>{
                return({
                    fieldName: el.manufacturer_name,
                    isCheckBox: true,
                    isActive: catalog.filters.mfg?.filter
                    (e => e === el.manufacturer_name).length > 0,
                    switchActiveState: ()=>{
                        console.log("LOG")
                        filter_handleClick(el.manufacturer_name, "mfg")
                    }
                })
            })
        )

    },[data, catalog])



    const getActiveFilters = (data: IST_HookedData): string[] => {
        const outData = [];
        if (data && data.fields)
            data.fields.map((el, i) => {
                if (el.isActive)
                    outData.push(el.fieldName);
            })

        return outData;
    }

    const filter_handleClick = useCallback((filter: string,
                                     key: keyof ICatalogFiltersType) => {

        let filters: Array<string> = getActiveFilters(firstFilter);

        const elIdx = filters.indexOf(filter);
        elIdx > -1 ? filters.splice(elIdx, 1) : filters.push(filter);

        dispatch(addNewFilter({
            key: key,
            filter: filters
        }))

    }, [firstFilter])

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

                    <ISTFiltersList
                        hookedData={firstFilter}
                    />

                </ISTFiltersWrapper>

            </div>
        </>

    );
};

export default CatalogTestFiltersModal;