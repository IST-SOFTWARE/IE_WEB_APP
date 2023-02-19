import {gql, OperationVariables} from "@apollo/client";


const callBack_varsBuilder = (name: string, phone: string, id?: string):OperationVariables => {
    if(!id){
        return {
            "data" : {
                "status": "draft",
                "cb_order": [
                    {
                        "client_name": `${name}`,
                        "client_phone": `${phone}`
                    }
                ]
            }
        }
    }

    else{
        return {
            "id": `${id}`,
            "data" : {
                "status": "draft",
                "cb_order": [
                    {
                        "client_name": `${name}`,
                        "client_phone": `${phone}`
                    }
                ]
            }
        }


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

export default callBack_varsBuilder;