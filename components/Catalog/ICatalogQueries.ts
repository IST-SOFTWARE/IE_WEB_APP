export type ISTCatalogStrArrFilter = string[]
export type ISTCatalogStrFilter = string
export type ISTCatalogNumArrFilter = number[]
export type ISTCatalogNumFilter = number
export type ISTCatalogBoolFilter = boolean

export interface ISTCatalogFilter<FILTER_TYPE>{
    key: keyof FILTER_TYPE,
    filter: FILTER_TYPE[keyof FILTER_TYPE]
}

type CatalogFilterMappingUtility<T> =
        T extends ISTCatalogStrArrFilter |
        ISTCatalogNumArrFilter |
        ISTCatalogStrFilter    |
        ISTCatalogNumFilter    ?
        T                      :
        ISTCatalogBoolFilter

type CatalogMappingUtility<T> = {
    [Property in keyof T]:
    CatalogFilterMappingUtility<T[Property]>
}

// STATE
type ICatalogQueries<T> = {
    catalog: boolean,
    search?: string,
    filters?: T
}

type ISCatalogHookInitialState<T> = ICatalogQueries<T> | null

// ACTIONS
type INewFilterBuilder<FT> = {
    <K extends keyof FT>(key: K, filter: FT[K]): ISTCatalogFilter<FT>
}

type IAddNewFilter<FT> = {
    <K extends keyof FT>(key: K, filter: FT[K]): void
}

export const useISTCatalog = <FT>() => {

    let ISTCatalog:
        ISCatalogHookInitialState<FT> = null

    const createCatalog = (catalog?: ICatalogQueries<FT>) => {
       ISTCatalog = ISTCatalogCreate<FT>(catalog);
    }

    const buildFilterItem: INewFilterBuilder<FT> = (
        key,
        filter
    ) => {
        return ISTNewCatalogFilterItem<FT, typeof key>(key, filter)
    }

    const addFilter: IAddNewFilter<FT> = (key, filter) => {
        ISTCatalogAddFilter<FT>({key, filter}, ISTCatalog)
    }

    return{
        ISTCatalog,
        createCatalog,
        buildFilterItem,
        addFilter
    }

}


export const ISTCatalogCreate = <FT>(catalog?: ICatalogQueries<FT>): ICatalogQueries<FT> => {
    return catalog ? catalog : {
        catalog: false,
        filters: <FT>{}
    } as ICatalogQueries<FT>
}


export const ISTCatalogAddFilter = <FT>
    (
        filter: ISTCatalogFilter<FT>,
        object: ICatalogQueries<FT>
    ) => {
    object.filters[filter.key] = filter.filter
    // console.log("Adding filter: ", filter, " to object: ", object)
}

export const ISTNewCatalogFilterItem = <FT,
    K extends keyof FT>(
    key: K,
    filter: FT[K]
): ISTCatalogFilter<FT> => {
    return {
        key,
        filter
    }
}






