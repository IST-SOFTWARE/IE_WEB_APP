import {
    ICatalogQueries,
    ISTCatalogAddFilter,
    ISTCatalogCreate,
    ISTCatalogFilter,
    ISTCatalogNewFilterItem
} from "./ICatalogQueries";

type ISCatalogHookInitialState<T> = ICatalogQueries<T> | null

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
        return ISTCatalogNewFilterItem<FT, typeof key>(key, filter)
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