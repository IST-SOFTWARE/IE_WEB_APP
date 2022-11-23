import { useQuery, gql } from '@apollo/client';

type Home_Page_our_products = {
    Title_Ru: string
    Have_q_label: string
    Have_q_label_Ru: string
    Linker: string
    Linker_Ru: string
    bottom_content: string
}

type ProdDemo_Cards = {
    id: number,
    Image: string,
    Title: string
}

export interface IHelloPageScheme{
    pageContent: Home_Page_our_products,
    productsCards: Array<ProdDemo_Cards>
}

export const GET_PRODUCT_DEMO_CONTENT = gql`
    query ProdDemoData{
        Home_Page_our_products{
            Titel
            Title_Ru
            Have_q_label
            Have_q_label_Ru
            Linker
            Linker_Ru
            bottom_content
        }
        ProdDemo_Cards{
            id
            Image
            Title
        }
    }
    `;