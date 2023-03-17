export type baseType = {
    type: any,
    handler: (...props)=>any;
}


export interface ISTCatalogStrArrFilter extends baseType{
    type: string[]
    handler: (obj: string) => void
}

export type ISTCatalogStrFilter = string
export type ISTCatalogNumArrFilter = number[]
export type ISTCatalogNumFilter = number
export type ISTCatalogBoolFilter = boolean

export interface ISTCatalogFilter<FILTER_TYPE>{
    key: keyof FILTER_TYPE,
    filter: FILTER_TYPE[keyof FILTER_TYPE]
}



// type CatalogFilterMappingUtility<T> =
//         T extends ISTCatalogStrArrFilter |
//         ISTCatalogNumArrFilter |
//         ISTCatalogStrFilter    |
//         ISTCatalogNumFilter    ?
//         T                      :
//         ISTCatalogBoolFilter
//
// type CatalogMappingUtility<T> = {
//     [Property in keyof T]:
//     CatalogFilterMappingUtility<T[Property]>
// }

// STATE
export type ICatalogQueries<T> = {
    catalog: boolean,
    search?: string,
    filters?: T
}

type baseFilterHandler<FT> = {
    (
        obj: ICatalogQueries<FT>,
        filter: ISTCatalogFilter<FT>
    ): void
}



interface ISTCatalogStrArrFilter_handler<FT> extends baseFilterHandler<FT> {}
interface ISTCatalogBoolFilter_handler<FT> extends baseFilterHandler<FT> {}


// type filterHandler<T> = {
//     handler: T extends
//         ISTCatalogStrArrFilter ?
//         ISTCatalogStrArrFilter_handler<T> :
//         ISTCatalogBoolFilter_handler<T>
// }

type filterHandler<T> = {
    handler:
        ISTCatalogStrArrFilter_handler<T> |
        ISTCatalogBoolFilter_handler<T>
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

    // const newFilter = filter.filter as
    //     CatalogFilterMappingUtility<ISTCatalogFilter<FT>>
    //
    // console.log(filter.key, ": ", newFilter);
    object.filters[filter.key] = filter.filter;
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

const newFilterHandlers = <FT>() => {
    const ISTCatalogStrArrFilter_handler: ISTCatalogStrArrFilter_handler<FT> = (
        obj, filter) => {
        console.log("TYPE: STRING[]")
        // obj.filters[filter.key] = filter.filter
    }

    const ISTCatalogBoolFilter_handler: ISTCatalogBoolFilter_handler<FT> = (
        obj, filter) => {
        console.log("TYPE: BOOL")
    }

    const newHandler = {} as filterHandler<FT>

}












