import {gql} from "@apollo/client";
import {IProductData} from "../../components/UI/ISTProductItem/common";

export interface IProducts{
    Products: Array<IProductItem>
}

interface IProductItem {
    id: string | number,
    image_url: string,
    product_name: string,
    product_name_ru: string,
    slug: string,
    vend_code: string | number,
    price: string | number
}

export const GET_PRODUCT_BY_ID = gql`
query getProductById($id: Float){
  Products(filter: {
      id: {
          _eq: $id
      }
  }){
      id,
      image_url,
      product_name,
      product_name_ru,
      slug,
      vend_code,
      price
  }
  }
`;