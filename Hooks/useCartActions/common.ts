import { DocumentNode, GraphQLError } from "graphql";

    //  ---- ---- ---- TYPES ---- ---- ----
    export type ICartIDGetterForCreation<CREATION_DATA_TYPE> = 
        (data: CREATION_DATA_TYPE) => string | number;

    export type IUpdatedDataResolver<UPDATE_DATA_TYPE> = 
        (data: UPDATE_DATA_TYPE) => void | UPDATE_DATA_TYPE | any;

    export type ICreateDataResolver<CREATION_DATA_TYPE> =
        (data: CREATION_DATA_TYPE) => void | CREATION_DATA_TYPE | any;

    export type ICreationFnc<MUTATION_VARS_TYPE, CREATION_DATA_TYPE> = (vars: MUTATION_VARS_TYPE) => Promise<CREATION_DATA_TYPE>
    export type IUpdateFnc<MUTATION_VARS_TYPE, UPDATE_CART_BY_ID> = (vars: MUTATION_VARS_TYPE) => Promise<UPDATE_CART_BY_ID>

    //  ---- ---- ---- CONSTANTS ---- ---- ----
    export const cartSessionObjectKey = "CART_SESSION"

    // ---- ---- ---- INTERFACES ---- ---- ----
    export interface IFailItem<EX_TYPE extends ReadonlyArray<GraphQLError> = ReadonlyArray<GraphQLError>>{
        operation: string,
        ex: EX_TYPE,
        calledFnc: (...props: any)=>any,
    }

    export interface ICartResolversConfig<CREATION_DATA_TYPE, UPDATE_DATA_TYPE>{
        cartIDGetterForCreation: ICartIDGetterForCreation<CREATION_DATA_TYPE>
        updateResolver?: IUpdatedDataResolver<UPDATE_DATA_TYPE>
        creationResolver?: ICreateDataResolver<CREATION_DATA_TYPE>
    }

    export interface ICartActionsConfig<MUTATION_VARS_TYPE, CREATION_DATA_TYPE, UPDATE_CART_BY_ID>{
        creation: ICreationFnc<MUTATION_VARS_TYPE, CREATION_DATA_TYPE>
        update: IUpdateFnc<MUTATION_VARS_TYPE, UPDATE_CART_BY_ID>
    }




