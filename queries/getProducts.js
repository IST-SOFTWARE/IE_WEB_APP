import fetchData from "../helpers/fetchData"
export const getProducts = async() => {

    const data = await fetchData(
        `
        query GetProducts{
            Products{
                id,
                product_name_ru,
                product_name,
                image_url,
                slug,
                text_description,
                price
            }
        }
        `,
        {
            variables: {}
        }
    )
    

    return data.data.Products;
}
