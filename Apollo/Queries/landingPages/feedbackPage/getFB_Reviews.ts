import {gql} from "@apollo/client";
import {category} from "./common";

type rating = {
    src: string
}

type message = {
    message: string,
    name: string,
    category: category,
    rating: rating,
}

export interface IFeedBackReviews{
    message: Array<message>,
}

export interface reviewItem{
    message: string,
    name: string,
    category: string,
    rating_src: string,
}

export function getFB_Reviews(data: IFeedBackReviews):Array<reviewItem>{

    const outData: Array<reviewItem> = [];

    data.message.map((el,i)=>{
        const nItem: reviewItem = {
            category: el.category.category[0].category_name,
            name: el.name,
            message: el.message,
            rating_src: el.rating.src
        }
        outData.push(nItem);
    })

    return outData;
}

export const GET_FEEDBACK_REVIEWS = gql`
query getFB_Reviews($lng_code: String){
    message{
        message,
        rating{
            src,
            tags,
        }
        name,
        category{
            category(filter: {
                languages_code: {_eq: $lng_code}
            }){
                category_name,
                languages_code,
            }
        }
    }
}
`