
export interface ISTCatalogFilter<FILTER_TYPE>{
    key: keyof FILTER_TYPE,
    filter: FILTER_TYPE[keyof FILTER_TYPE]
}


export type ICatalogQueries<T> = {
    catalog: boolean,
    search?: string,
    filters?: T
}


export const ISTCatalogCreate = <FT>(catalog?: ICatalogQueries<FT>): ICatalogQueries<FT> => {
    return catalog ? catalog : {
        catalog: false,
        filters: <FT>{}
    } as ICatalogQueries<FT>
}


export const ISTCatalogUpdateFilter = <FT>
    (
        filter: ISTCatalogFilter<FT>,
        object: ICatalogQueries<FT>
    ) => {

        object.filters[filter.key] =
            filter.filter;
}


export const ISTCatalogNewFilterItem = <FT,
    K extends keyof FT>(
    key: K,
    filter: FT[K]
): ISTCatalogFilter<FT> => {
    return {
        key,
        filter
    }
}













