
export type ISTCatalogStrArrFilter = Array<string>
export type ISTCatalogStrFilter = string
export type ISTCatalogNumArrFilter = Array<number>
export type ISTCatalogNumFilter = number
export type ISTCatalogBoolFilter = boolean

export type CatalogMappingUtility<T> = {
    [Property in keyof T]: T[Property] extends
        ISTCatalogStrArrFilter |
        ISTCatalogNumArrFilter |
        ISTCatalogStrFilter    |
        ISTCatalogNumFilter    ?
        T[Property]            :
        ISTCatalogBoolFilter
}

type ICatalogQueries<T> = {
    catalog: boolean,
    search?: string,
    filters?: CatalogMappingUtility<T>

    addFilter: <K extends keyof T>(filter: T[K]) => void
}

export const newCatalog = <FILTERS_TYPE>(filters?: FILTERS_TYPE): ICatalogQueries<FILTERS_TYPE> => {
    let defObj = {
        catalog: false,
    } as ICatalogQueries<FILTERS_TYPE>

    if(filters)
        defObj.filters = filters as CatalogMappingUtility<FILTERS_TYPE>

    return defObj
}






