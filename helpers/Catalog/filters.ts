import {ICatalogFiltersType} from "../../store/slices/common/catalogFiltersType";


// interface getFiltersDesignationSList_out_t {
//     designations: string[],
// }

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
