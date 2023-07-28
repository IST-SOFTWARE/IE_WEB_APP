import React, {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  cartAdder_fnc_onAdd,
  deleteProduct_fnc_onDelete,
} from "../../UI/common";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  GRT_FILTERED_PRODUCTS_LIST,
  IProductFiltersVariables,
  IProducts_Q,
} from "../../../queries/products/productActions";
import ISTProductItem from "../../UI/ISTProductItem/ISTProductItem";
import { useAppSelector } from "../../../Hooks/reduxSettings";

import styles from "./catalogWrapper.module.scss";

import { filterExclude_filtersHelper } from "../../../helpers/Catalog/filters";
import {
  CREATE_CART_COLLECTION,
  GET_CART_COLLECTION_BY_ID,
  ICartCollection,
  ICartCollection_created,
  ICartCollection_updated,
  ICartCollectionVariables,
  ICartItem,
  UPDATE_CART_BY_ID,
} from "../../../queries/cart/cartActions";
import {
  products_addItem_actionsHelper,
  products_removeItem_actionsHelper,
} from "../../../helpers/Products/products_actions.helper";
import { ICartItem_properties_data } from "../../UI/ISTProductItem/Abstract/ICartTypes";
import {
  redefining_to_CartModel_redefiningHelper,
  redefining_to_ICartItemPropertiesData_redefiningHelper,
} from "../../../helpers/Products/products_redefining.helper";
import { ImageLoader } from "next/image";
import { imageLoader_imagesHelper } from "../../../helpers/Images/customImageLoader";
import { useDispatch } from "react-redux";
import { setOffset } from "../../../store/slices/catalogSlices/catalogPaginationSlice";
import { ICreationFnc, IUpdateFnc } from "../../../Hooks/useSessionActions/common";
import { useSessionActions } from "../../../Hooks/useSessionActions/useSessionActions";
import { IDirectusGraphQlErrors } from "../../../Directus/ExceptionTypes/DirectusExceptionTypes";
import { cartCollection, ICatalogWrapper } from "./ICatalogWrapper";
import { RU_LOCALE } from '../../../locales/locales'

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

  // CART 
  const [refetchDataState, setRefetchDataState] = useState<boolean>(true);

  const [onMutateCart_create] = useMutation<
    ICartCollection_created,
    ICartCollectionVariables
  >(CREATE_CART_COLLECTION, {
    onError: (ex) => {
      console.log(ex);
      // addToCartExceptions({
      //     operation: "cart creation",
      //     ex: ex.graphQLErrors,
      //     calledFnc: addToCart
      // })
    },
  });

  const [onMutateCart_add] = useMutation<
    ICartCollection_updated,
    ICartCollectionVariables
  >(UPDATE_CART_BY_ID, {
    onError: (ex) => {
      handleCartExc(ex.graphQLErrors);
    },
  });

  const cartCreateNew = useCallback<
    ICreationFnc<ICartCollectionVariables, ICartCollection_created>
  >(
    async (variables: ICartCollectionVariables) => {
      return await onMutateCart_create({ variables: variables }).then(
        (data) => {
          return data?.data;
        }
      );
    },
    [onMutateCart_create]
  );

  const cartUpdateItem = useCallback<
    IUpdateFnc<ICartCollectionVariables, ICartCollection_updated>
  >(
    async (variables: ICartCollectionVariables) => {
      return await onMutateCart_add({ variables: variables }).then((data) => {
        return data?.data;
      });
    },
    [onMutateCart_add]
  );

  const [cartProducts, setCartProducts] = 
    useState<ICartItem_properties_data[]>([]);

  const _updateResolver = (data: ICartCollection_updated) => {
    const newCartModel = data?.update_cartCollection_item?.cart_model;
    if (newCartModel) cartItemsUpdater(newCartModel);
  };

  const _creationResolver = (data: ICartCollection_created) => {
    const newCartModel = data?.create_cartCollection_item?.cart_model;
    if (newCartModel) cartItemsUpdater(newCartModel);
  };

  const {
    handleSessionException,
    getSessionFromLS,
    removeSession,
    updateData,
  } = useSessionActions<
    ICartCollectionVariables,
    ICartCollection_created,
    ICartCollection_updated,
    IDirectusGraphQlErrors
  >(
    "id",
    {
      creation: cartCreateNew,
      update: cartUpdateItem,
    },
    {
      sessionIDGetterForCreation: (data) => {
        return data?.create_cartCollection_item?.id.toString();
      },
      updateResolver: _updateResolver,
      creationResolver: _creationResolver,
    }
  );

  const [getCartData, cartData] = useLazyQuery<cartCollection>(
    GET_CART_COLLECTION_BY_ID,
    {
      fetchPolicy: "cache-and-network",
      variables: { id: getSessionFromLS()?.toString() },
    }
  );

  const handleCartExc = useCallback(
    (ex: IDirectusGraphQlErrors) => {
      const nonExistentCartHandling = () => {
        return ex.find((el) => el.extensions?.code === "FORBIDDEN");
      };

      handleSessionException({
        ex: ex,
        onHandle: (ex, fnc, vars) => {
          const nonExistentCartError = nonExistentCartHandling();

          if (
            ex?.length > 0 &&
            nonExistentCartError &&
            refetchDataState &&
            fnc &&
            vars
          ) {
            setRefetchDataState(false);
            removeSession();

            fnc({
              ...vars,
              id: null,
            }).then((data) => {
              if (!data.result || !data.id) {
                console.log(
                  "OOPS, something went wrong, refresh page =) ",
                  refetchDataState
                );
              }
            });
          }
        },
      });
    },
    [handleSessionException, refetchDataState, removeSession]
  );


  // GETTING CATALOG
  const { data, error, loading, fetchMore } = useQuery<
    IProducts_Q,
    IProductFiltersVariables
  >(GRT_FILTERED_PRODUCTS_LIST, {
    variables: fullProdVars,
    fetchPolicy: "network-only",
  });

  // LOADING HANDLER
  useEffect(()=>{
    if(!data || !cartProducts || loading) 
      loadingSetter(true)
    else
      loadingSetter(false);

  },[data, cartProducts, loading, loadingSetter]) 

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

  const cartItemsUpdater = useCallback(
    (data: ICartItem[]) => {
      const newCartItems = new Array<ICartItem_properties_data>();
      data?.map((_el) => {
        newCartItems.push({
          productId: _el.product_id,
          quantity: _el.quantity,
        } as ICartItem_properties_data);
      });
      setCartProducts(newCartItems);
    },
    [setCartProducts]
  );

  const cartItemsFetch = useCallback(() => {
    if (!getCartData) return;

    getCartData().then((el) =>
      el?.data
        ? cartItemsUpdater(el.data.cartCollection_by_id?.cart_model)
        : null
    );
  }, [cartItemsUpdater, getCartData]);

  useEffect(() => {
    if (data) cartItemsFetch();
  }, [cartItemsFetch, data]);

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

  // CART MOVEMENTS
  const cartAdder = useCallback<cartAdder_fnc_onAdd>(
    async (id) => {
      if (!cartProducts) return false;

      const newCart = products_addItem_actionsHelper(cartProducts, id, 1);

      const vars = {
        id: null,
        data: {
          status: "Draft",
          cart_model: redefining_to_CartModel_redefiningHelper(newCart),
        },
      } as ICartCollectionVariables;

      updateData(vars);

      return true;
    },
    [cartProducts, updateData]
  );

  const cartRemover = useCallback<deleteProduct_fnc_onDelete>(
    async (id) => {
      if (
        !cartProducts ||
        !cartData?.data?.cartCollection_by_id ||
        !getSessionFromLS()
      )
        return false;

      const newCart = products_removeItem_actionsHelper(cartProducts, id);

      const vars = {
        id: getSessionFromLS()?.toString(),
        data: {
          status: "Draft",
          cart_model: redefining_to_CartModel_redefiningHelper(newCart),
        },
      } as ICartCollectionVariables;

      updateData(vars);

      return true;
    },
    [
      cartProducts,
      cartData?.data?.cartCollection_by_id,
      getSessionFromLS,
      updateData,
    ]
  );

  // PRODUCT IMAGE OPTIMIZATIONS
  const getImageLoader = useCallback<ImageLoader>(({ src, width, quality }) => {
    let cloudinary_acc = process.env.NEXT_PUBLIC_CLOUDINARY_ACC;
    const imageHelper = new imageLoader_imagesHelper(cloudinary_acc);
    const newUrl = imageHelper.customImageLoader({ src, width, quality });

    return newUrl ? newUrl : src;
  }, []);

  const getImageSrc = useCallback((src: string, v_code: string): string => {
    const cloudinary_acc = process.env.NEXT_PUBLIC_CLOUDINARY_ACC;
    const imageHelper = new imageLoader_imagesHelper(cloudinary_acc);
    return imageHelper.getCloudinaryImageByUrl(src, v_code, "ProductsImages");
  }, []);

  return (
    <>
      <div
        style={{ ...wrapperStyles }}
        className={`${wrapper_ClassName} ${styles.wrapper}`}
      >
        {data && cartProducts
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
                      loader: getImageLoader,
                      sizes: "350px",
                    }}
                    itemType={{
                      productType: "catalog",
                      parameters: {
                        inline: false,
                        cartStatus: !!cartProducts.find(
                          (_el) => _el.productId === el.id
                        ),

                        cartAdder: cartAdder,
                        cartRemover: cartRemover,
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
                        image: getImageSrc(
                          el?.image_url,
                          el?.vend_code.toString()
                        ),
                      },
                    }}
                  />
                </div>
              );
            }) : null}
      </div>
    </>
  );
};
