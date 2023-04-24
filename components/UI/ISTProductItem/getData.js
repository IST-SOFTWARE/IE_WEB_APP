export const createCart = `

    mutation createCartCollectionItem($data: create_cartCollection_input!){
        create_cartCollection_item(data: $data){
            id
        }
    }
`

export const updateCart = `
    
    mutation updateCartCollectionItem($data: update_cartCollection_input!, $id: ID!){
        update_cartCollection_item(data: $data, id: $id){
            id 
        }
    }

`

export const getCart = `
    query getSessionItem($id: ID!){
        cartCollection_by_id(id: $id){
            id
            cart_model
        }
    }

`

export const getProductBy_id = 
        `
        query getProductData($id: Float){
            Products(filter: {id: {_eq: $id}}){
                     product_name_ru,
                product_name,
                image_url,
                slug,
                vend_code,
                weight,
                text_description,
                available_status,
                price, 
                included_in

            }
        }
        `

import fetchData from "../helpers/fetchData";

const getData = async(query, dataName, variables = {}) => {
    const data = await fetchData(
        query,
        {
            variables
        }
    )
    return data?.data[dataName]

}

export default getData

