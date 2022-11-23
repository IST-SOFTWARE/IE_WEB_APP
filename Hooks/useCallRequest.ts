import {ApolloClient, ApolloError, NormalizedCacheObject, OperationVariables} from "@apollo/client";
import React, {useEffect, useState} from "react";
import {DocumentNode} from "graphql/language";
import {dataForSend, dataSender} from "../helpers/dataSender";
import {newCallBack, SEND_NEW_CALLBACK} from "../queries/sendCallBack";
import {apolloClient} from "../Apollo/apolloClient";
import {GraphQLErrors} from "@apollo/client/errors";


const useCallRequest = <T extends newCallBack>(
    data: dataForSend,
    name: string,
    phone: string,
    dataSetter: React.Dispatch<T>
) => {

    const[sendErrors, setError] = useState<GraphQLErrors>(null);

    const sender = new dataSender<T>(
        data.client, data.data,
        SEND_NEW_CALLBACK,
        {
            "data" : {
                "status": "draft",
                "cb_order": [
                    {
                        "client_name": `${name}`,
                        "client_phone": `${phone}`
                    }
                ]
            }
        },
        dataSetter,
        setError
    )

    const send = () =>{
        sender.mutation();
    }


    return {
        sendErrors,
        send
    };
}

export default useCallRequest;