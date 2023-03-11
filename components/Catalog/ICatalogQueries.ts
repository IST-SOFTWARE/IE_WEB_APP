
export type CatalogFilter = Record<string, string[]>
export type ICatalogQueries = {
    catalog: boolean,
    search?: string,
    filters?: Array<CatalogFilter>
}

export const switchCatalog = (state: ICatalogQueries) => {
    state.catalog = !state.catalog;
}

export const addFilter = (
    state: ICatalogQueries,
    filter: CatalogFilter) => {
    console.log(Object.keys(filter));
}