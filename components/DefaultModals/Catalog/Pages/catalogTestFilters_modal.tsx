import React, {FC, useCallback, useState} from 'react';
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../UI/hooks/ISTFiltersHook/useISTFiltersList";
import {useDispatch} from "react-redux";
import {addNewFilter} from "../../../../store/slices/catalogSlice/catalogSlice";
import {useAppSelector} from "../../../../Hooks/reduxSettings";
import {useQuery} from "@apollo/client";
import {GET_MFG_CATEGORY_LIST, ICategoryMFG_Q} from "../../../../queries/categories/MFG/mfgCategoryQuery";
import {filterSetter_filtersHelper, isActiveNow_filtersHelper} from "../../../../helpers/Catalog/filters";
import {ICatalogFiltersType} from "../../../../store/slices/common/catalogFiltersType";

import {IST_HookedData, onFilterSwitchCustom_t} from "../../../UI/hooks/ISTFiltersHook/common";


const CatalogTestFiltersModal: FC = () => {

    const dispatch = useDispatch();
    const catalog = useAppSelector(state => state.catalog);

    const {data} = useQuery<ICategoryMFG_Q>(
        GET_MFG_CATEGORY_LIST,
    )

    const [firstFilter, firstActive, designation] =
        useISTFiltersList<ICatalogFiltersType>(
            "mfg"
        );


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
            <div
                style={{
                    width: "350px",
                    height: "450px"
                }}
            >

                <ISTFiltersWrapper
                    title={"FILTER TEST"}
                    hasActives={firstActive}
                    mobileSettings={{
                        type: "dropdown",
                        mobileSizeTrigger: "LG_992",
                    }}

                    isOpened={true}
                >
                    {data && data?.manufacturer_category ? (
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

                            hookedData={firstFilter}
                            switcherOptions={{
                                onSwitch: switchFilter,
                                filterDesignation: designation
                            }}
                        />
                    ) : null}

                </ISTFiltersWrapper>

            </div>
        </>

    );
};

export default CatalogTestFiltersModal;