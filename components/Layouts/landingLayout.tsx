import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useBaseModal from "../ISTModals/useBaseModal";
import { toc_catalog_search } from "../DefaultModals/table_of_contents/Catalog/toc_catalog_search";
import { toc_catalog_full_prod_list } from "../DefaultModals/table_of_contents/Catalog/toc_catalog_full_prod_list";
import CatalogWrapper_modal from "../DefaultModals/Catalog/catalogWrapper_modal";
import CatalogSearchModal from "../DefaultModals/Catalog/Pages/catalogSearch_modal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import {
  setCatalogState,
  updateCatalog,
} from "../../store/slices/catalogSlices/catalogSlice";
import Catalog from "../Catalog/Catalog";
import { useQuery } from "@apollo/client";
import {
  GENERAL_CATEGORY_QUERY,
  IGeneralCategoryQuery,
} from "../../queries/categories/generalCategoryQuery";
import { filtersList_update } from "../../store/slices/filtersListSlice/filtersListSlice";
import { getFiltersItemsAsArray_filtersHelper } from "../../helpers/Catalog/filters";
import CatalogFullProductsListModal from "../DefaultModals/Catalog/Pages/catalogFullProductsList_modal";
import { getData } from "../../queries/fetch/getData";
import {setRegion} from "../../store/slices/regionSlice/regionSlice";

interface ILandingLayout {
  children?: ReactNode;
}

type currencyValues = {
  Valute: {
    USD: {
      Value: number;
      Previous: number;
    };
  };
};

export const LandingLayout: FC<ILandingLayout> = ({ children }) => {

    const CURRENCY_FETCH = process.env.NEXT_PUBLIC_CURRENCY_FETCH;
    const CURRENCY_PERCENT_DIFF = process.env.NEXT_PUBLIC_CURRENCY_PERCENT_DIFF

    const router = useRouter();
    const dispatch = useDispatch();
    const [multiplier, setMultiplier] = useState<number>(0);
    const [mobileCatalogOpeningSearchState, setMobileCatalogOpeningSearchState] =
        useState<boolean>(false);

  const { modalComponent, ModalView } = useBaseModal(
    "APP_BODY_WRAPPER",
    "CatalogSpace"
  );

    // [ Get general filters ]
    const { data, error } = useQuery<IGeneralCategoryQuery>(
        GENERAL_CATEGORY_QUERY
    );

    // [ Set common filters ]
    useEffect(() => {
        if (!data) return;

        dispatch(
            filtersList_update({
                mfg: getFiltersItemsAsArray_filtersHelper(
                    data,
                    "manufacturer_category",
                    "manufacturer_name"
                ),
                unit: getFiltersItemsAsArray_filtersHelper(
                    data,
                    "Unit_category",
                    "unit_name"
                ),
                type: getFiltersItemsAsArray_filtersHelper(
                    data,
                    "Type_category",
                    "type_name"
                ),

                available: ["-1", "0", "1"],
            })
        );
    }, [data]);

    // [ Modals defining ]
    useEffect(() => {
        if (modalComponent) {
            modalComponent.editModals(
                [toc_catalog_search, toc_catalog_full_prod_list],
                0
            );
        }
    }, [modalComponent]);

    // [ Get currency multiplier]
    useEffect(() => {
        async function getMultiplier() {
            await getData<currencyValues>(
                CURRENCY_FETCH
            ).then((curr) => {
                let diff = Math.abs(curr.Valute.USD.Previous - curr.Valute.USD.Value);

                let percentDiff = (diff / curr.Valute.USD.Previous) * 100;

                percentDiff >= Number(CURRENCY_PERCENT_DIFF)
                    ? setMultiplier(1 / curr.Valute.USD.Value)
                    : setMultiplier(1 / curr.Valute.USD.Previous);
            });
        }

        if (multiplier <= 0) {
            getMultiplier();
        }
    }, []);

    // [ Set currency && region ]
    useEffect(()=>{

        if(!(multiplier > 0) || !router)
            return

        dispatch(setRegion({
            region: router.locale === "en-US" ? "EN" : "RU",
            currency: router.locale === "en-US" ? "USD" : "RUB",
            currencyMultiplier: multiplier
        }));

    },[multiplier, router])

  return (
    <>
      <Catalog modal={modalComponent}>
        <ModalView>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              display: "flex",
              zIndex: "1000",
            }}
          ></div>

          <CatalogWrapper_modal
              data={modalComponent}
              searching={mobileCatalogOpeningSearchState}
          >
            {modalComponent.isCurrentModal(toc_catalog_search.typeName) ? (
              <CatalogSearchModal />
            ) : null}

            {modalComponent.isCurrentModal(
              toc_catalog_full_prod_list.typeName
            ) ? (
              <CatalogFullProductsListModal />
            ) : null}
          </CatalogWrapper_modal>
        </ModalView>
      </Catalog>

      <Header
        catalogOpener={() => {
          modalComponent.applyModalByName(toc_catalog_full_prod_list.typeName);
          dispatch(setCatalogState(true));
        }}
        searchOpener={() => {
            if(Number(window.innerHeight) > 991.98) {
                modalComponent.applyModalByName(toc_catalog_search.typeName);
                dispatch(setCatalogState(true));
            }
            else{
                modalComponent.applyModalByName(toc_catalog_full_prod_list.typeName)
                    .then(() => setMobileCatalogOpeningSearchState(true));
                dispatch(setCatalogState(true));
            }
        }}
      />

      {children}

      <Footer route={router.locale} />
    </>
  );
};

export default LandingLayout;
