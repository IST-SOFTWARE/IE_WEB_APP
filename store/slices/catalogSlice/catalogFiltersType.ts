import {ISTCatalogStrArrFilter} from "../../../components/Catalog/ICatalogQueries";

export interface ICatalogFiltersType{
    mfg: string[],
    unit: string[],
    type: string[],
    available: boolean,
}
