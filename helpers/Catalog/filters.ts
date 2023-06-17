import {ICatalogFiltersType} from "../../store/slices/common/catalogFiltersType";
import {IGeneralCategoryQuery} from "../../queries/categories/generalCategoryQuery";
import {ICatalogQueries} from "../../Hooks/useCatalog/ICatalogQueries";

export const getFiltersDesignationSList_filtersHelper =
    (selectedTypes: keyof ICatalogFiltersType): string=> {
    return selectedTypes
}

export const filterSetter_filtersHelper = (
    filtersList: ICatalogFiltersType,
    key: keyof ICatalogFiltersType,
    filter: string,
):string[] => {

    if(!filtersList)
        return

    const outArr:Array<string> =
        filtersList[key] ?
            [...filtersList[key]] :
            [];

    const elIdx = outArr.indexOf(filter);
    elIdx > -1 ? outArr.splice(elIdx, 1) : outArr.push(filter);

    return outArr
}

export const isActiveNow_filtersHelper = (filtersList: ICatalogFiltersType, key: keyof ICatalogFiltersType, name: string): boolean => {
    if(!filtersList)
        return

    let res = false;

    filtersList[key]?.map(el => {
        if(el === name)
            res = true
    })

    return res
}


export const getFiltersItemsAsArray_filtersHelper = (
    data: IGeneralCategoryQuery,
    category: keyof IGeneralCategoryQuery,
    key: string
):string[] => {

    const ouArr = new Array<string>();
    const dataOfCategory = data[category];

    dataOfCategory.map(el => {
        if(el[key])
            ouArr.push(el[key]);
    })

    return ouArr;
}

export const filterExclude_filtersHelper = (
    excludeValues: string[],
    targetObj: string[]
): string[] => {

    if(!(excludeValues?.length === targetObj?.length))
        return targetObj.filter( function( el ) {
            return excludeValues.indexOf( el ) < 0;
        } );

    return [""];
}

export const listHasActives_filtersHelper = (
    catalog:  ICatalogQueries<ICatalogFiltersType>,
    filter: keyof ICatalogFiltersType
): boolean => {
    if(catalog?.filters)
        return catalog.filters[filter] && catalog.filters[filter]?.length > 0

    return false
}
