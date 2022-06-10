export const getProductDataById = 
        `
        query GetProductData($id: Float){
            Products(filter: {id: {_eq: $id}}){
                product_name_ru,
                product_name,
                image_url,
                slug,
                vend_code,
                weight,
                text_description,
                available_status,
                a,b,c,d,e,f,
                price, 
                included_in

            }
        }
        `