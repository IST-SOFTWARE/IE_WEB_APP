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
  // >> ---- ---- ---- EX Handling ---- ---- ----
  const [fails, setFails] = useState<
    IFailItem<CREATION_DATA_TYPE, UPDATE_DATA_TYPE, EXCEPTIONS_TYPE>[]
  >([]);

  const [cachedData, setCachedData] =
    useState<
      ICachedData<MUTATION_VARS_TYPE, CREATION_DATA_TYPE, UPDATE_DATA_TYPE>
    >();

  const addToCartExceptions = useCallback(
    (
      data: IFailItem<CREATION_DATA_TYPE, UPDATE_DATA_TYPE, EXCEPTIONS_TYPE>
    ) => {
      const newExList = [...fails];
      newExList.push({
        ...data,
      });
      setFails(newExList);
    },
    [fails]
  );

  const handleCartException = useCallback(
    (
      data: IHandlingFailItem<
        CREATION_DATA_TYPE,
        UPDATE_DATA_TYPE,
        MUTATION_VARS_TYPE,
        EXCEPTIONS_TYPE
      >
    ) => {
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

  const setSessionToLS = useCallback((id: string | number) => {
    window !== undefined
      ? localStorage.setItem(cartSessionObjectKey, id.toString())
      : null;
  }, []);

  const removeCartSession = useCallback(() => {
    let _sessionCaratId = getSessionFromLS();
    if (_sessionCaratId && window)
      localStorage.removeItem(cartSessionObjectKey);
  }, [getSessionFromLS]);

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

  const variablesBuilder = useCallback(
    (
      IdFieldName: typeof cartIdFieldName,
      data: MUTATION_VARS_TYPE
    ): MUTATION_VARS_TYPE => {
      const newSession = getSessionFromLS();

      return newSession
        ? {
            ...data,
            [IdFieldName]: newSession,
          }
        : data;
    },
    [getSessionFromLS]
  );

  const addToCart = useCallback(
    async (
      cartData: MUTATION_VARS_TYPE
    ): Promise<IAddingDataResult<UPDATE_DATA_TYPE | CREATION_DATA_TYPE>> => {

      let result = {
        id: null,
        result: null,
      } as IAddingDataResult<UPDATE_DATA_TYPE | CREATION_DATA_TYPE>;

      const newVars = variablesBuilder(cartIdFieldName, cartData);

      setCachedData({
        variables: newVars,
        function: addToCart,
      });

      if (newVars[cartIdFieldName.toString()])
        await cartAdder.update(newVars).then((data) => {
          if (!data) return;

          result = {
            id: newVars[cartIdFieldName.toString()],
            result: data,
          };

          cartAdder.getUpdatedDataResolver
            ? cartAdder.getUpdatedDataResolver(data)
            : console.warn(
                "Cannot find resolver configuration to modify cart. Check the useCartActions configuration"
              );
        });
      else {
        await cartAdder.create(newVars).then((data) => {
          if (!data || !cartAdder.getCartIDGetterForCreation) {
            console.warn(
              "Could not find a function to get the new cart ID required to register a new cart. Check the useCartActions configuration "
            );
            return;
          }

          if (!cartAdder.getCartIDGetterForCreation(data)) {
            console.warn(
              "Failed to get an ID for a new cart system entry. Check the useCartActions configuration"
            );
            return;
          }

          result = {
            id: cartAdder.getCartIDGetterForCreation(data),
            result: data,
          };

          setSessionToLS(cartAdder.getCartIDGetterForCreation(data).toString());

          cartAdder.getCreateDataResolver
            ? cartAdder.getCreateDataResolver(data)
            : "Cannot find resolver configuration to cart creation. Check the useCartActions configuration";
        });
      }

      return new Promise((resolve) => {
        resolve(result);
      });
    },
    [cartAdder, cartIdFieldName, setSessionToLS, variablesBuilder]
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
