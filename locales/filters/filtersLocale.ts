import {
    IAvailableAdditionalFilter
} from "../../components/Catalog/Filters/Additional/Available_additional/IAvailableAdditionalFilter";

interface INamesOfFiltersList{
    manufacturer: string
    unit: string,
    type: string,
    available: string
}

export interface IFiltersLocale{
    available: IAvailableAdditionalFilter
    namesOfFiltersList: INamesOfFiltersList
}

