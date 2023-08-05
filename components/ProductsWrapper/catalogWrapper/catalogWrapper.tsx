import React, { FC, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GRT_FILTERED_PRODUCTS_LIST,
  IProductFiltersVariables,
  IProducts_Q,
} from "../../../queries/products/productActions";
import ISTProductItem from "../../UI/ISTProductItem/ISTProductItem";
import { useAppSelector } from "../../../Hooks/reduxSettings";
import styles from "./catalogWrapper.module.scss";
import { filterExclude_filtersHelper } from "../../../helpers/Catalog/filters";
import { useDispatch } from "react-redux";
import { setOffset } from "../../../store/slices/catalogSlices/catalogPaginationSlice";
import { ICatalogWrapper } from "./ICatalogWrapper";
import { RU_LOCALE } from "../../../locales/locales";
import { useCartActions } from "../../../Hooks/useCartActions/useCartActions";
import { useImageOptimization } from "../../../Hooks/useImagePtimization/useImageOptimization";

export const CatalogWrapper: FC<ICatalogWrapper> = ({
  itemWrapper_ClassName,
  loadingSetter,
  wrapper_ClassName,
  wrapperStyles,
  itemWrapperStyles,
  additionalForwarding,
}) => {
  // FILTERING & PAGINATION [STATE]
  const catalog = useAppSelector((selector) => selector.catalog);
  const filtersList = useAppSelector((selector) => selector.filtersList);
  const pagination = useAppSelector((selector) => selector.pagination);
  const [fetchedAll, setFetchedAll] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [fullProdVars, setFullProdsVars] = useState<IProductFiltersVariables>({
    ...pagination,
    mfg: [""],
    unit: [""],
    type: [""],
    available: [""],
    search: "",
  });

  // REGION HANDLING [STATE]
  const regionHandler = useAppSelector((selector) => selector.region);

  // GETTING CATALOG
  const { data, error, loading, fetchMore } = useQuery<
    IProducts_Q,
    IProductFiltersVariables
  >(GRT_FILTERED_PRODUCTS_LIST, {
    variables: fullProdVars,
    fetchPolicy: "network-only",
  });

  // IMAGE OPTIMIZATION
  let cloudinary_acc = process.env.NEXT_PUBLIC_CLOUDINARY_ACC;
  const PROD_IMAGES_ROOT = process.env.NEXT_PUBLIC_PROD_IMAGES_ROOT;
  const PROD_NAME_INCLUDED_PART =
    process.env.NEXT_PUBLIC_PROD_NAME_INCLUDED_PART;

  const { sourcedLoader } = useImageOptimization(
    cloudinary_acc,
    PROD_NAME_INCLUDED_PART,
    PROD_IMAGES_ROOT
  );

  // CART HANDLING
  const { cData, cAdder, cRemover, cFetch } = useCartActions();

  useEffect(() => {
    if (data) cFetch();
  }, [cFetch, data]);

  // LOADING HANDLER
  useEffect(() => {
    if (!data || !cData || loading) loadingSetter(true);
    else loadingSetter(false);
  }, [cData, data, loading, loadingSetter]);

  // CATALOG FILTERING
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setFetchedAll(false);

      setFullProdsVars((prevState) => {
        return prevState.search || catalog?.search
          ? {
              ...prevState,
              offset: 0,
              search: catalog.search,
            }
          : prevState;
      });

      dispatch(setOffset(0));
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [catalog?.search, dispatch]);

  useEffect(() => {
    if (!catalog.filters || !filtersList) return;

    let newState = {
      mfg:
        catalog.filters.mfg && catalog.filters.mfg?.length > 0
          ? filterExclude_filtersHelper(catalog.filters.mfg, filtersList.mfg)
          : [""],

      unit:
        catalog.filters.unit && catalog.filters.unit?.length > 0
          ? filterExclude_filtersHelper(catalog.filters.unit, filtersList.unit)
          : [""],

      type:
        catalog.filters.type && catalog.filters.type?.length > 0
          ? filterExclude_filtersHelper(catalog.filters.type, filtersList.type)
          : [""],

      available:
        catalog.filters.available && catalog.filters.available?.length > 0
          ? filterExclude_filtersHelper(
              catalog.filters.available,
              filtersList.available
            )
          : [""],
    } as Pick<IProductFiltersVariables, "mfg" | "unit" | "type" | "available">;

    setFetchedAll(false);

    setFullProdsVars((prevState) => {
      return {
        ...prevState,
        ...newState,
        offset: 0,
      };
    });

    dispatch(setOffset(0));
  }, [filtersList, catalog?.filters, dispatch]);

  // PAGINATION HANDLING
  useEffect(() => {
    if (!fetchedAll && pagination.offset > 0)
      fetchMore<IProducts_Q, IProductFiltersVariables>({
        variables: {
          ...fullProdVars,
          limit: pagination?.limit,
          offset: pagination?.offset,
        },
      })
        .then((el) => {
          if (!(el?.data?.Products?.length > 0)) setFetchedAll(true);
        })
        .catch((ex) => console.error(ex));
  }, [pagination, fetchedAll, fetchMore, fullProdVars]);

  return (
    <>
      <div
        style={{ ...wrapperStyles }}
        className={`${wrapper_ClassName} ${styles.wrapper}`}
      >
        {data && cData
          ? data.Products?.map((el, i) => {
              return (
                <div
                  className={itemWrapper_ClassName}
                  style={itemWrapperStyles}
                  key={`productItemCatalog_${i}_key`}
                >
                  <ISTProductItem
                    currencySymbol={
                      regionHandler.currency[regionHandler.currentCurrencyId]
                        ?.currencySymbol
                    }
                    forwardingPath={`${additionalForwarding}/${el?.slug}`}
                    style={{
                      fill: true,
                    }}
                    imageOptimization={{
                      loader: sourcedLoader,
                      sizes: "350px",
                    }}
                    itemType={{
                      productType: "catalog",
                      parameters: {
                        inline: false,
                        cartStatus: !!cData.find(
                          (_el) => _el.productId === el.id
                        ),

                        cartAdder: cAdder,
                        cartRemover: cRemover,
                      },

                      data: {
                        id: el?.id,

                        title:
                          regionHandler.region === RU_LOCALE
                            ? el.product_name_ru
                            : el.product_name,

                        price: (
                          Number(el.price) *
                          regionHandler.currency[
                            regionHandler.currentCurrencyId
                          ]?.currencyMultiplier
                        ).toString(),

                        vendCode: el?.vend_code.toString(),
                        image: el?.image_url,
                      },
                    }}
                  />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};
