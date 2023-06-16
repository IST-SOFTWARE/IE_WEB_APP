import React, { FC, useCallback, useEffect, useState } from "react";
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../UI/hooks/ISTFiltersHook/useISTFiltersList";
import { useDispatch } from "react-redux";
import { addNewFilter } from "../../../../store/slices/catalogSlices/catalogSlice";
import { useAppSelector } from "../../../../Hooks/reduxSettings";
import { useQuery } from "@apollo/client";
import {
  GET_MFG_CATEGORY_LIST,
  ICategoryMFG_Q,
} from "../../../../queries/categories/MFG/mfgCategoryQuery";
import {
  filterSetter_filtersHelper,
  isActiveNow_filtersHelper,
} from "../../../../helpers/Catalog/filters";
import { ICatalogFiltersType } from "../../../../store/slices/common/catalogFiltersType";
import {
  IST_HookedData,
  onFilterSwitchCustom_t,
} from "../../../UI/hooks/ISTFiltersHook/common";
import useBaseModal from "../../../ISTModals/useBaseModal";
import { toc_filtersList_page_mobile } from "../../table_of_contents/Catalog/mobile/toc_filtersList_page_mobile";


const CatalogTestFiltersModal: FC = () => {
  const dispatch = useDispatch();
  const catalog = useAppSelector((state) => state.catalog);

  const { modalComponent, ModalView } = useBaseModal(
    "Catalog_Modal_wrapper",
    "CatalogSpace_mobile_modal"
  );

  const { data } = useQuery<ICategoryMFG_Q>(GET_MFG_CATEGORY_LIST);

  const catalogFilter = useAppSelector((selector) => selector.filtersList);

  const [firstFilter, firstActive, designation] =
    useISTFiltersList<ICatalogFiltersType>("mfg");

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

  useEffect(() => {
    if (modalComponent) {
      modalComponent.editModals([toc_filtersList_page_mobile], 0);
    }
  }, [modalComponent]);

  return (
    <>
      <div
        style={{
          width: "350px",
          height: "450px",
        }}
      >
        <ISTFiltersWrapper
          title={"FILTER TEST"}
          hasActives={firstActive}
          mobileSettings={{
            type: "transfer",
            onTransfer(...props) {
              modalComponent
                .applyModalByName(toc_filtersList_page_mobile.typeName)
                .then(() => modalComponent.switch(!modalComponent.getState));
            },
            mobileSizeTrigger: "MD_768",
          }}
          isOpened={true}
        >
          {catalogFilter && catalogFilter?.mfg ? (
            <ISTFiltersList
              fields={catalogFilter.mfg.map((el) => {
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
              hookedData={firstFilter}
              switcherOptions={{
                onSwitch: switchFilter,
                filterDesignation: designation,
              }}
            />
          ) : null}
        </ISTFiltersWrapper>


        {/*<ModalMobilePage*/}
        {/*  header={{*/}
        {/*    title: "Производители",*/}
        {/*    type: "hiding_MMHeader_type",*/}
        {/*    arrowHandler: () => {*/}
        {/*      console.log("Arrow handler trigger");*/}
        {/*    },*/}
        {/*  }}*/}
        {/*>*/}

        {/*  /!* CHILDREN  закинул для примера *!/*/}

        {/*  {catalogFilter && catalogFilter?.mfg ? (*/}
        {/*    <ISTFiltersList*/}
        {/*      fields={catalogFilter.mfg.map((el) => {*/}
        {/*        return {*/}
        {/*          fieldName: el,*/}
        {/*          isCheckBox: true,*/}
        {/*          isActive: isActiveNow_filtersHelper(*/}
        {/*            catalog?.filters,*/}
        {/*            "mfg",*/}
        {/*            el*/}
        {/*          ),*/}
        {/*        };*/}
        {/*      })}*/}
        {/*      hookedData={firstFilter}*/}
        {/*      switcherOptions={{*/}
        {/*        onSwitch: switchFilter,*/}
        {/*        filterDesignation: designation,*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  ) : null}*/}
        {/*</ModalMobilePage>*/}


      </div>
    </>
  );
};

export default CatalogTestFiltersModal;
