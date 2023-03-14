
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

export interface ISTCatalogFilter<FILTER_TYPE>{
    key: keyof FILTER_TYPE,
    filter: FILTER_TYPE[keyof FILTER_TYPE]
}


type ICatalogQueries<T> = {
    catalog: boolean,
    search?: string,
    filters?: CatalogMappingUtility<T>

    addFilter: <K extends keyof T>(key: K, filter: T[K]) => void
}

type INewFilterBuilder<FT> = {
    <K extends keyof FT>(key: K, filter: FT[K]): ISTCatalogFilter<FT>
}

export const useISTCatalogFilters = <FT>() => {

    const createCatalog = (filters?: FT): ICatalogQueries<FT> => {
        let baseObj = {
            catalog: false,
        } as ICatalogQueries<FT>

        baseObj.filters = filters ?
            filters as CatalogMappingUtility<FT> :
            {} as CatalogMappingUtility<FT>

        //INIT [addFilter]
        baseObj.addFilter = (key: keyof FT, filter: FT[keyof FT]) => {
            baseObj.filters[key] = filter as
                CatalogFilterMappingUtility<FT[keyof FT]>
            console.log(baseObj.filters);
        };

        return baseObj
    }


    const buildFilterItem: INewFilterBuilder<FT> = (
        key,
        filter
    ) => {
        return {
            key,
            filter
        }
    }

    return{
        createCatalog,
        buildFilterItem,
    }

}

// export const newCatalog = <FT>(filters?: FT): ICatalogQueries<FT> => {
//     let defObj = {
//         catalog: false,
//     } as ICatalogQueries<FT>
//
//     defObj.filters = filters ?
//         filters as CatalogMappingUtility<FT> :
//         {} as CatalogMappingUtility<FT>
//
//     //INIT [addFilter]
//     defObj.addFilter = (key: keyof FT, filter: FT[keyof FT]) => {
//         defObj.filters[key] = filter as
//             CatalogFilterMappingUtility<FT[keyof FT]>
//         console.log(defObj.filters);
//     };
//
//     return defObj
// }
//
//
// export const ISTBuildNewFilterItem = <FT,
//     K extends keyof FT>(
//     key: K,
//     filter: FT[K]
// ): ISTCatalogFilter<FT> => {
//     return {
//         key,
//         filter
//     }
// }






