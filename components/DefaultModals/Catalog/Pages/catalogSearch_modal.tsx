import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import IstInput, { inputTypesVars } from "../../../UI/ISTInput/ISTInput";
import ISTCategoryHints from "../../../UI/ISTCategoryHints/ISTCategoryHints";
import styles from "../../../../styles/Modals/catalog/catalogSearch/catalogSearch.module.scss";
import useISTFiltersList from "../../../UI/hooks/ISTFiltersHook/useISTFiltersList";
import { onFilterSwitchCustom_t } from "../../../UI/hooks/ISTFiltersHook/common";
import {
  addNewFilter,
  setSearch,
} from "../../../../store/slices/catalogSlices/catalogSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../Hooks/reduxSettings";
import { getHintsList_hintsHelper } from "../../../../helpers/Catalog/hints";
import { ICatalogFiltersType } from "../../../../store/slices/common/catalogFiltersType";
import { CatalogWrapper } from "../../../ProductsWrapper/catalogWrapper/catalogWrapper";
import cloudSearch from "../../../../public/Modals/Catalog/cloudSearch.svg";
import { useRouter } from "next/router";
import ISTButtonN from "../../../UI/ISTButton/ISTButtonN";
import en from "../../../../locales/en";
import ru from "../../../../locales/ru";
import { useTransition } from "../../../../Hooks/useTranslation/useTranslation";
import { EN_LOCALE, RU_LOCALE } from "../../../../locales/locales";
import hints_ru from "../../../../locales/istCategoryHints/ru";
import hints_en from "../../../../locales/istCategoryHints/en";
import useBaseModal from '../../../../Hooks/useBaseModal/useBaseModal'
import LoaderModal from '../../Loader/Loader_modal'

export interface ICatalogSearchModal_translation {
  search: string;
  request: string;

  //product block
  product: string;
  searchProduct: string;
}

export interface ICategoryHints_translation {
  manufacturer: string;
  unit: string;
  type: string;
  availability: string;
}

interface ICatalogSearchModal {
  onOpenFullProdList: (...props: any) => any;
  translation: ICatalogSearchModal_translation;
}

 
const CatalogSearchModal: FC<ICatalogSearchModal> = ({
  onOpenFullProdList,
  translation,
}) => {

  const currentTranslation = useTransition<ICategoryHints_translation>([
    { locale: RU_LOCALE, translation: hints_ru },
    { locale: EN_LOCALE, translation: hints_en },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const t = router.locale === "ru-RU" ? en : ru;

  const dispatch = useDispatch();
  const catalog = useAppSelector((state) => state.catalog);
  const filters = useAppSelector((state) => state.filtersList);

  const [loaderState, setLoaderState] = useState<boolean>(false)
  const {ModalView, modalComponent} = useBaseModal(
      undefined,
      "LoadingSpace"
  )

  useEffect(()=>{
    modalComponent.switch(loaderState)
  },[loaderState, modalComponent])


  const [mfgFilter, ha_mfg, mfg_designation] =
    useISTFiltersList<ICatalogFiltersType>("mfg");

  const [unitFilter, ha_unit, unit_designation] =
    useISTFiltersList<ICatalogFiltersType>("unit");

  const [typeFilter, ha_type, type_designation] =
    useISTFiltersList<ICatalogFiltersType>("type");

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const switchFilter: onFilterSwitchCustom_t<keyof ICatalogFiltersType> =
    useCallback(
      (idx, state, name, options) => {
        if (!catalog || !catalog.filters || !options) return;

        dispatch(
          addNewFilter({
            key: options,
            filter: [name],
          })
        );

        dispatch(setSearch(""));
      },
      [catalog, dispatch]
    );

  const setSearch_helper = (val: string) => {
    dispatch(setSearch(val));
  };

  return (
    <>
      {/*Filters bock*/}
      <div
        className={`d-none d-lg-block col-0 col-lg-6 ${styles.catalogFiltersModal_comp}`}
      >
        <div className={styles.headerContainer}>
          <header className={styles.header}>{translation?.search}</header>
        </div>

        <div className={styles.inputAndHints_block}>
          <IstInput
            ref={inputRef}
            inputType={inputTypesVars.any_string}
            placeholder={translation?.request}
            required={true}
            outDataSetter={setSearch_helper}
            actualData={catalog?.search}
            style={{
              height: "50px",
              borderRadius: "15px",
            }}
          />

          <div className={styles.hints_block}>
            <ISTCategoryHints
              hintsLimit={3}
              hintsList={getHintsList_hintsHelper(
                [filters.mfg, filters.type, filters.unit],
                !catalog?.search ? "" : catalog?.search
              )}
              hintsCategoryCollection={[
                {
                  collectionName: currentTranslation?.translation?.manufacturer,
                  listedHintsId: 0,
                  switcherOptions: {
                    onSwitch: switchFilter,
                    filterDesignation: mfg_designation,
                  },
                },
                {
                  collectionName: currentTranslation?.translation?.unit,
                  listedHintsId: 2,
                  switcherOptions: {
                    onSwitch: switchFilter,
                    filterDesignation: unit_designation,
                  },
                },
                {
                  collectionName: currentTranslation?.translation?.type,
                  listedHintsId: 1,
                  switcherOptions: {
                    onSwitch: switchFilter,
                    filterDesignation: type_designation,
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/*Products bock*/}
      <div
        className={`col-12 col-lg-6 h-100 pl-0 pl-lg-3 pr-0 pr-lg-3 ${styles.catalogFiltersModal_comp}`}
      >
        <div
          className={styles.headerContainer}
          style={{ justifyContent: "space-between" }}
        >
          <header className={styles.header}>{translation?.product}</header>

          {catalog?.search && (
            <div style={{ width: "180px", alignSelf: "center" }}>
              <ISTButtonN
                onClick={onOpenFullProdList}
                title={{ caption: t.buttonsTitle.allResult }}
                dark={{
                  solid: false,
                  style: {
                    borderRadius: "15px",
                    fillContainer: true,
                  },
                }}
              />
            </div>
          )}
        </div>

        {/*PRODUCTS LIST OUT*/}

        <div
          className={`${styles.catalogItems_block} ${
            catalog?.search ? styles.longList : ""
          }`}
        >
          {catalog?.search ? (
            <CatalogWrapper
              itemWrapper_ClassName={styles.productCardVariant_Block}
              additionalForwarding={""}
              loadingSetter={setLoaderState}
            />
          ) : (
            <div className={styles.noResultsBlock}>
              <Image
                src={cloudSearch}
                alt={"not result"}
                width={176}
                height={176}
                fill={false}
                sizes={"186px"}
                style={{
                  objectFit: "contain",
                }}
              />
              <div className={styles.noResultsText}>
                {translation?.searchProduct}
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalView>
        <LoaderModal/>
      </ModalView>
    </>
  );
};

export default CatalogSearchModal;
