import {gql} from "@apollo/client";

export interface ICartCollection {
  id: string;
  cart_model: cart_model[];
}

type cart_model = {
  product_id: string;
  quantity: number;
  price: string;
};

export const GET_CART_COLLECTION_BY_ID = gql`
query getSessionItem($id: ID!){
    cartCollection_by_id(id: $id){
        id
        cart_model
    }
}
`;

export const GET_PRODUCT_CART_BY_ID = gql`
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