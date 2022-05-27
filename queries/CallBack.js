export const CreateCallBack = `

    mutation createCallBackItem($data: create_CB_Requests_input!){
        create_CB_Requests_item(data: $data){
            id
        }
    }
`