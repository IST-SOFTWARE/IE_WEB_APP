import UNIT_CATEGORY_Q from "./UNIT_CATEGORY_Q.graphql"

export type Unit_category = Array<category_query_t>
type category_query_t = {
    Unit_name: string,
    slug: string
}

export const GET_UNIT_CATEGORY_LIST = UNIT_CATEGORY_Q
