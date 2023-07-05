import React, {FC, useCallback} from "react";
import {ICatalogFiltersType} from "../../../../../../store/slices/common/catalogFiltersType";
import {useAppSelector} from "../../../../../../Hooks/reduxSettings";
import useISTFiltersList from "../../../../../UI/hooks/ISTFiltersHook/useISTFiltersList";
import {useDispatch} from "react-redux";
import {onFilterSwitchCustom_t} from "../../../../../UI/hooks/ISTFiltersHook/common";
import {
    filterSetter_filtersHelper,
    getAdditionalFilter_filtersHelper,
    isActiveNow_filtersHelper
} from "../../../../../../helpers/Catalog/filters";
import {addNewFilter} from "../../../../../../store/slices/catalogSlices/catalogSlice";
import ISTFiltersList from "../../../../../UI/ISTFiltersList/components/ISTFiltersList";
import {useTransition} from "../../../../../../locales/hook/useTranslation";
import {IFiltersLocale} from "../../../../../../locales/filters/filtersLocale";
import {EN_LOCALE, RU_LOCALE} from "../../../../../../locales/locales";
import ru from "../../../../../../locales/filters/ru";
import en from "../../../../../../locales/filters/en";

interface mobileFilterModal {
    pageDesignation: keyof ICatalogFiltersType;
}

export const CatalogFilterPageMobileModal: FC<mobileFilterModal> = ({
    pageDesignation
}) => {

    const {currentTranslation} = useTransition<IFiltersLocale>([
        {locale: RU_LOCALE, translation: ru},
        {locale: EN_LOCALE, translation: en}
    ]);

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
                    getAdditionalFilter_filtersHelper(name, currentTranslation)
                );

                dispatch(
                    addNewFilter({
                        key: options,
                        filter: newFilters,
                    })
                );
            },
            [dispatch, catalog, currentTranslation]
        );


    return(
        <div style={{
            marginTop: "-8px",
        }}>
            {catalogFilter && catalogFilter[pageDesignation] ? (
                <ISTFiltersList
                    fields={catalogFilter[pageDesignation].map((el) => {
                        return {
                            fieldName: getAdditionalFilter_filtersHelper(el, currentTranslation),
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