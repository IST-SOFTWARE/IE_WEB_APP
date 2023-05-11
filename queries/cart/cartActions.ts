import {gql} from "@apollo/client";

export interface ICartCollection {
  id: string | number;
  cart_model: cart_model[];
}

type cart_model = {
  product_id: string | number;
  quantity: number;
  price: string;
};

export interface ICartCollectionVariables {
  id: string | number;
  data: {status: t_status, cart_model: cart_model[]}
}

type t_status = "Published" | "Draft" | "Archived"


export const GET_CART_COLLECTION_BY_ID = gql`
query getSessionItem($id: ID!){
    cartCollection_by_id(id: $id){
        id
        cart_model
    }
}
`;


export const UPDATE_CART_BY_ID = gql`
mutation updateCartCollectionItem(
  $data: update_cartCollection_input!
  $id: ID!
) {
  update_cartCollection_item(data: $data, id: $id) {
    id
  }
}
`;