import {gql} from "@apollo/client";

export interface newCallBack{
    create_CB_Requests_item:{
        id: string
    }
}

export const SEND_NEW_CALLBACK = gql`
mutation sendCallBackRequest($data: create_CB_Requests_input!){
    create_CB_Requests_item(data: $data){
        id
    }
}
`

export const UPDATE_CALLBACK_REQ = gql`
mutation sendCallBackRequest($data: update_CB_Requests_input!, $id: ID!){
    update_CB_Requests_item(data: $data, id: $id){
        id
    }
}
`