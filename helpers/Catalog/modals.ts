import {ICatalogFiltersType} from "../../store/slices/common/catalogFiltersType";

export const catalogHasFilters_modalsHelper = (catalogData: ICatalogFiltersType):boolean => {
    let _hasFilters:boolean = false;

    for(const [key, value] of Object.entries(catalogData))
        if(value && value.length > 0)
            _hasFilters = true;

    return _hasFilters;
}