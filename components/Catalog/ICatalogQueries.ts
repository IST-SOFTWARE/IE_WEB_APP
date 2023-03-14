
export type ISTCatalogStrArrFilter = string[]
export type ISTCatalogStrFilter = string
export type ISTCatalogNumArrFilter = number[]
export type ISTCatalogNumFilter = number
export type ISTCatalogBoolFilter = boolean

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


type ICatalogQueries<T> = {
    catalog: boolean,
    search?: string,
    filters?: CatalogMappingUtility<T>

    addFilter: <K extends keyof T>(key: K, filter: T[K]) => void
}

export const newCatalog = <FILTERS_TYPE>(filters?: FILTERS_TYPE): ICatalogQueries<FILTERS_TYPE> => {
    let defObj = {
        catalog: false,
    } as ICatalogQueries<FILTERS_TYPE>

    defObj.filters = filters ?
        filters as CatalogMappingUtility<FILTERS_TYPE> :
        {} as CatalogMappingUtility<FILTERS_TYPE>


    const addFilter = (key: keyof FILTERS_TYPE, filter: FILTERS_TYPE[keyof FILTERS_TYPE]) => {

        defObj.filters[key] = filter as
            CatalogFilterMappingUtility<FILTERS_TYPE[keyof FILTERS_TYPE]>
        console.log(defObj.filters);
    }


    defObj.addFilter = addFilter;
    return defObj
}






