import { useCallback, useEffect, useState } from "react";
import {
  IAddingDataResult,
  IAsyncFncType,
  ICachedData,
  ICartActionsConfig,
  ICartResolversConfig,
  IFailItem,
  IHandlingFailItem,
  cartSessionObjectKey,
} from "./common";
import { ISTCartAdder } from "./cartAdder";
import { GraphQLError } from "graphql";

export const useCartActions = <
  MUTATION_VARS_TYPE,
  CREATION_DATA_TYPE,
  UPDATE_DATA_TYPE = any,
  EXCEPTIONS_TYPE extends ReadonlyArray<GraphQLError> = ReadonlyArray<GraphQLError>
>(
  cartIdFieldName: keyof MUTATION_VARS_TYPE | string,
  cartActionsConfig: ICartActionsConfig<
    MUTATION_VARS_TYPE,
    CREATION_DATA_TYPE,
    UPDATE_DATA_TYPE
  >,
  cartResolversConfig?: ICartResolversConfig<
    CREATION_DATA_TYPE,
    UPDATE_DATA_TYPE
  >
) => {
  const [sessionCaratId, setSessionCaratId] = useState<string>();

  // >> ---- ---- ---- EX Handling ---- ---- ----
  const [fails, setFails] = useState<IFailItem<CREATION_DATA_TYPE, UPDATE_DATA_TYPE, EXCEPTIONS_TYPE>[]>([]);

  const [cachedData, setCachedData] =
    useState<
      ICachedData<MUTATION_VARS_TYPE, CREATION_DATA_TYPE, UPDATE_DATA_TYPE>
    >();

  const addToCartExceptions = useCallback(
    (data: IFailItem<CREATION_DATA_TYPE, UPDATE_DATA_TYPE, EXCEPTIONS_TYPE>) => {
      const newExList = [...fails];
      newExList.push({
        ...data,
      });
      setFails(newExList);
    },
    [fails]
  );

  const handleCartException = useCallback(
    (data: IHandlingFailItem<CREATION_DATA_TYPE, UPDATE_DATA_TYPE, MUTATION_VARS_TYPE, EXCEPTIONS_TYPE>) => {
      if (!data) return;
      data.onHandle(
        data.ex,
        cachedData?.function,
        cachedData?.variables,
        data.operation
      );
    },
    [cachedData]
  );

  const getSessionFromLS = useCallback(() => {
    return typeof window !== "undefined" &&
      localStorage.getItem(cartSessionObjectKey)
      ? localStorage.getItem(cartSessionObjectKey)
      : null;
  }, []);

  useEffect(() => {
    let _sessionCaratId = getSessionFromLS();
    if (_sessionCaratId) setSessionCaratId(_sessionCaratId);
  }, [getSessionFromLS]);

  useEffect(() => {
    let _sessionCaratId = getSessionFromLS();
    if (!_sessionCaratId && sessionCaratId && window)
      localStorage.setItem(cartSessionObjectKey, sessionCaratId);
  }, [sessionCaratId, getSessionFromLS]);

  const removeCartSession = useCallback(() => {
    let _sessionCaratId = getSessionFromLS();
    if (!_sessionCaratId && sessionCaratId && window)
      localStorage.removeItem(cartSessionObjectKey);
  }, [getSessionFromLS, sessionCaratId]);

  const [cartAdder] = useState(
    new ISTCartAdder<CREATION_DATA_TYPE, UPDATE_DATA_TYPE, MUTATION_VARS_TYPE>(
      cartActionsConfig,
      cartResolversConfig
    )
  );

  const configureCartResolvers = useCallback(
    (config: ICartResolversConfig<CREATION_DATA_TYPE, UPDATE_DATA_TYPE>) => {
      if (!cartAdder) return;

      cartAdder.setCartIDGetterForCreation = config.cartIDGetterForCreation;
      cartAdder.setUpdatedDataResolver = config.updateResolver;
      cartAdder.setCreateDataResolver = config.creationResolver;
    },
    [cartAdder]
  );

  const addToCart = useCallback(
    async (
      cartData: MUTATION_VARS_TYPE
    ): Promise<IAddingDataResult<UPDATE_DATA_TYPE | CREATION_DATA_TYPE>> => {
      setCachedData({
        variables: cartData,
        function: addToCart,
      });

      let result = {
        id: null,
        result: null,
      } as IAddingDataResult<UPDATE_DATA_TYPE | CREATION_DATA_TYPE>;

      if (sessionCaratId)
        await cartAdder
          .update({
            ...cartData,
            [cartIdFieldName]: sessionCaratId,
          })
          .then((data) => {
            if (!data) return;

            result = {
              id: sessionCaratId,
              result: data,
            };

            cartAdder.getUpdatedDataResolver
              ? cartAdder.getUpdatedDataResolver(data)
              : console.warn(
                  "Cannot find resolver configuration to modify cart. Check the useCartActions configuration"
                );
          });
      else {
        await cartAdder
          .create({
            ...cartData,
          })
          .then((data) => {
            if (!data || !cartAdder.getCartIDGetterForCreation) {
              console.warn(
                "Could not find a function to get the new cart ID required to register a new cart. Check the useCartActions configuration "
              );
              return;
            }

            const newSessionID = cartAdder.getCartIDGetterForCreation(data);

            if (newSessionID) {
              result = {
                id: newSessionID,
                result: data,
              };

              setSessionCaratId(newSessionID.toString());
              cartAdder.getCreateDataResolver
                ? cartAdder.getCreateDataResolver(data)
                : "Cannot find resolver configuration to cart creation. Check the useCartActions configuration";
            } else
              console.warn(
                "Failed to get an ID for a new cart system entry. Check the useCartActions configuration"
              );
          });
      }

      return new Promise((resolve, reject) => {
        resolve(result);
      });
      
    },
    [sessionCaratId, cartAdder, cartIdFieldName, getSessionFromLS]
  );

  return {
    fails,
    addToCart,
    getSessionFromLS,
    removeCartSession,
    handleCartException,
    addToCartExceptions,
    configureCartResolvers,
  };
};
