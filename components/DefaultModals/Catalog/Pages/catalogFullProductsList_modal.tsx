import React, { FC, useCallback, useState } from "react";
import styles from "../../../../styles/Modals/catalog/catalogProducts/catalogFullProductsList.module.scss";
import { useAppSelector } from "../../../../Hooks/reduxSettings";
import useISTFiltersList from "../../../UI/hooks/ISTFiltersHook/useISTFiltersList";
import { ICatalogFiltersType } from "../../../../store/slices/common/catalogFiltersType";
import { useDispatch } from "react-redux";
import { onFilterSwitchCustom_t } from "../../../UI/hooks/ISTFiltersHook/common";
import {
  filterSetter_filtersHelper,
  getAdditionalFilter_filtersHelper,
  getNamedFiltersListItem_filtersHelper,
  isActiveNow_filtersHelper,
} from "../../../../helpers/Catalog/filters";
import { addNewFilter } from "../../../../store/slices/catalogSlices/catalogSlice";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import { CatalogWrapper } from "../../../ProductsWrapper/catalogWrapper/catalogWrapper";
import { useRouter } from "next/router";
import ru from "../../../../locales/ru";
import en from "../../../../locales/en";

import upd_ru from "../../../../locales/filters/ru";
import upd_en from "../../../../locales/filters/en";

import { useTransition } from "../../../../locales/hook/useTranslation";
import { IFiltersLocale } from "../../../../locales/filters/filtersLocale";
import { EN_LOCALE, RU_LOCALE } from "../../../../locales/locales";

export interface ICatalogFullProductListModal_translation {
  manufacturer: string;
  unit: string;
  type: string;
  availability: string;
}

interface ICatalogFullProductListModal {
  translation: ICatalogFullProductListModal_translation;
}

const CatalogFullProductsListModal: FC<ICatalogFullProductListModal> = ({
  translation,
}) => {
  const filtersList = useAppSelector((state) => state.filtersList);


  // Filters state
  const [mfg_filter, mfg_active, mfg_designation] =
    useISTFiltersList<ICatalogFiltersType>("mfg");

  const [types_filter, types_active, types_designation] =
    useISTFiltersList<ICatalogFiltersType>("type");

  const [units_filter, units_active, units_designation] =
    useISTFiltersList<ICatalogFiltersType>("unit");

  const [av_filter, av_active, av_designation] =
    useISTFiltersList<ICatalogFiltersType>("available");

  const currentTranslation  = useTransition<IFiltersLocale>([
    { locale: RU_LOCALE, translation: upd_ru },
    { locale: EN_LOCALE, translation: upd_en },
  ]);

  // Redux catalog state & dispatch
  const dispatch = useDispatch();
  const catalog = useAppSelector((state) => state.catalog);

  // add/remove function (Catalog)
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

  return (
    <>
      {/*Filters bock*/}
      <div className={"col-4 position-relative p-0 pl-2 d-none d-lg-flex"}>
        <div className={styles.catalogFilter_Block}>
          {/*Производители*/}

          <ISTFiltersWrapper
            title={translation?.manufacturer}
            isOpened={true}
            hasActives={mfg_active}
            mobileSettings={{
              type: "dropdown",
              mobileSizeTrigger: "LG_992",
            }}
          >
            <ISTFiltersList
              fields={filtersList?.mfg?.map((el) => {
                return {
                  fieldName: el,
                  isCheckBox: true,
                  isActive: isActiveNow_filtersHelper(
                    catalog?.filters,
                    "mfg",
                    el
                  ),
                };
              })}
              hookedData={mfg_filter}
              switcherOptions={{
                onSwitch: switchFilter,
                filterDesignation: mfg_designation,
              }}
            />
          </ISTFiltersWrapper>

          {/*Типы*/}

          <ISTFiltersWrapper
            title={translation?.type}
            isOpened={false}
            hasActives={types_active}
            mobileSettings={{
              type: "dropdown",
              mobileSizeTrigger: "LG_992",
            }}
          >
            <ISTFiltersList
              fields={filtersList?.type?.map((el) => {
                return {
                  fieldName: el,
                  isCheckBox: true,
                  isActive: isActiveNow_filtersHelper(
                    catalog?.filters,
                    "type",
                    el
                  ),
                };
              })}
              hookedData={types_filter}
              switcherOptions={{
                onSwitch: switchFilter,
                filterDesignation: types_designation,
              }}
            />
          </ISTFiltersWrapper>

          {/*Узлы*/}

          <ISTFiltersWrapper
            title={translation?.unit}
            isOpened={false}
            hasActives={units_active}
            mobileSettings={{
              type: "dropdown",
              mobileSizeTrigger: "LG_992",
            }}
          >
            <ISTFiltersList
              fields={filtersList?.unit?.map((el) => {
                return {
                  fieldName: el,
                  isCheckBox: true,
                  isActive: isActiveNow_filtersHelper(
                    catalog?.filters,
                    "unit",
                    el
                  ),
                };
              })}
              hookedData={units_filter}
              switcherOptions={{
                onSwitch: switchFilter,
                filterDesignation: units_designation,
              }}
            />
          </ISTFiltersWrapper>

          <ISTFiltersWrapper
            title={getNamedFiltersListItem_filtersHelper(
              av_designation,
              currentTranslation
            )}
            isOpened={false}
            hasActives={av_active}
            mobileSettings={{
              type: "dropdown",
              mobileSizeTrigger: "LG_992",
            }}
          >
            <ISTFiltersList
              fields={filtersList?.available?.map((el) => {
                return {
                  fieldName: getAdditionalFilter_filtersHelper(
                    el,
                    currentTranslation
                  ),
                  isCheckBox: true,
                  isActive: isActiveNow_filtersHelper(
                    catalog?.filters,
                    "available",
                    el
                  ),
                };
              })}
              hookedData={av_filter}
              switcherOptions={{
                onSwitch: switchFilter,
                filterDesignation: av_designation,
              }}
            />
          </ISTFiltersWrapper>
        </div>
      </div>

      {/*Products bock*/}

      <div className={"col-12 col-lg-8 p-0 pl-lg-2 d-flex flex-wrap"}>
        <CatalogWrapper
          itemWrapper_ClassName={styles.productCardVariant_Block}
          // cartID={"9cfa4d6a-f2e9-400c-b0a9-4c85ab777272"}
          additionalForwarding={""}
        />
      </div>
    </>
  );
};

export default CatalogFullProductsListModal;
