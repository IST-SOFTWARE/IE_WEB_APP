import {gql} from "@apollo/client";
import {category} from "./common";

export interface IFeedBackCategories{
    categories: Array<category>,
}

export interface IFeedBackCategoriesVars{
    lng_code: string
}

export function getFB_CategoriesArr(data: IFeedBackCategories):Array<string>{
    const categories = Array<string>();
    data?.categories.map((el, i)=>{
        categories.push(el.category[0].category_name);
    })

    return categories;
}

export const GET_FEEDBACK_CATEGORIES = gql`
query getFeedbackCategories($lng_code: String){
    categories{
        category(filter: {
            languages_code:{
                code:{
                    _eq: $lng_code
                }
            }
        }){
            category_name
            languages_code{
                code
            }
        }
    }
}
`