import React, {FC, useCallback} from "react";
import {ICatalogFiltersType} from "../../../../../../store/slices/common/catalogFiltersType";
import {useAppSelector} from "../../../../../../Hooks/reduxSettings";
import useISTFiltersList from "../../../../../UI/hooks/ISTFiltersHook/useISTFiltersList";
import {useDispatch} from "react-redux";
import {onFilterSwitchCustom_t} from "../../../../../UI/hooks/ISTFiltersHook/common";
import {filterSetter_filtersHelper, isActiveNow_filtersHelper} from "../../../../../../helpers/Catalog/filters";
import {addNewFilter} from "../../../../../../store/slices/catalogSlices/catalogSlice";
import ISTFiltersList from "../../../../../UI/ISTFiltersList/components/ISTFiltersList";

interface mobileFilterModal {
    pageDesignation: keyof ICatalogFiltersType;
}

export const CatalogFilterPageMobileModal: FC<mobileFilterModal> = ({
    pageDesignation
}) => {

    const catalogFilter = useAppSelector((selector) => selector.filtersList);

    const catalog = useAppSelector((state) => state.catalog);

    const [firstFilter, firstActive, designation] =
        useISTFiltersList<ICatalogFiltersType>(pageDesignation);

    const dispatch = useDispatch();

    const switchFilter: onFilterSwitchCustom_t<keyof ICatalogFiltersType> =
        useCallback(
            (idx, state, name, options) => {
                if (!catalog || !catalog.filters || !options) return;

                const newFilters = filterSetter_filtersHelper(
                    catalog.filters,
                    options,
                    name
                );

                dispatch(
                    addNewFilter({
                        key: options,
                        filter: newFilters,
                    })
                );
            },
            [dispatch, catalog]
        );

    return(
        <div style={{
            marginTop: "-8px"
        }}>
            {catalogFilter && catalogFilter[pageDesignation] ? (
                <ISTFiltersList
                    fields={catalogFilter[pageDesignation].map((el) => {
                        return {
                            fieldName: el,
                            isCheckBox: true,
                            isActive: isActiveNow_filtersHelper(catalog?.filters, pageDesignation, el),
                        };
                    })}
                    hookedData={firstFilter}
                    switcherOptions={{
                        onSwitch: switchFilter,
                        filterDesignation: designation,
                    }}
                />
            ) : null}

        </div>
    )
}