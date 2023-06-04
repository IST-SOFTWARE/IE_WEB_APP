import get_by_id from "./GET_PRODUCT_BY_ID.graphql"
import get_full_list from "./GET_FULL_PRODUCT_LIST.graphql";
import get_filtered from "./GET_FILTERED_PRODUCTS_LIST.graphql"
import {IQueryPaginationVariable} from "../common";
import {ICatalogFiltersType} from "../../store/slices/common/catalogFiltersType";

export interface IProducts_Q {
    Products: Array<IProductItem>
}

export interface IProductFiltersVariables extends IQueryPaginationVariable, IFiltersVars{};

interface IFiltersVars extends ICatalogFiltersType{
    search: string;
}

interface IProductItem {
    id: string | number,
    image_url: string,
    product_name: string,
    product_name_ru: string,
    slug: string,
    vend_code: string | number,
    price: string | number,

    weight: string | number,
    text_description: string,

    form_factor_image: string,
    sizes: string,

    analogue_text: string,
    included_text: string,
    replacement_text: string,
}

export const GET_PRODUCT_BY_ID = get_by_id;
export const GET_FULL_PRODUCTS_LIST = get_full_list;
export const GRT_FILTERED_PRODUCTS_LIST = get_filtered;