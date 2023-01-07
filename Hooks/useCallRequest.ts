import {ApolloClient, NormalizedCacheObject, OperationVariables} from "@apollo/client";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {DocumentNode} from "graphql/language";
import {dataSender} from "../helpers/dataSender";
import callBack_varsBuilder, {SEND_NEW_CALLBACK, UPDATE_CALLBACK_REQ} from "../queries/sendCallBack";
import {GraphQLErrors} from "@apollo/client/errors";

type dataType = {
    refObj: React.MutableRefObject<any | null>;
    required: boolean
}

interface dataForQuery{
    query: DocumentNode,
    vars: OperationVariables,
    isSession: boolean,
}

const useCallRequest = (
    inputs: Array<dataType>,
    client: ApolloClient<NormalizedCacheObject>,
    name: string,
    phone: string,
) => {

    const[errors, setErrors] = useState<GraphQLErrors>(null);
    const[newData, setNewData] = useState(null);


    //CHECK DATA IS FILLED
    const dataIsFilled = ():boolean => {
        let validToSend = true;

        inputs.map((elem, i)=>{
            if(elem.refObj.current.value.length < 2 && elem.required){
                elem.refObj.current.classList.add("_input_required");
                validToSend = false;
            }

        })

        return validToSend;
    }

    // HANDLE INPUTS WRITING
    useEffect(()=>{
        if(inputs){
            inputs.map((elem, index) => {
                if(
                    elem.refObj.current.classList.contains("_input_required") &&
                    elem.required &&
                    elem.refObj.current.value.length >= 2
                ){

                    elem.refObj.current.classList.remove("_input_required");
                }

            })

        }

    },[inputs])


    const sessionChecker = ():dataForQuery =>{

        const sessionStatus = typeof window !== 'undefined' &&
            localStorage.getItem('session_id') !== null;


        let reqType: DocumentNode = null;
        let vars: OperationVariables = null;

        if(sessionStatus){
            reqType = UPDATE_CALLBACK_REQ;
            vars = callBack_varsBuilder(name, phone,
                localStorage.getItem('session_id'));
        }
        else{
            vars = callBack_varsBuilder(name, phone);
            reqType = SEND_NEW_CALLBACK;
        }

        return {
            vars: vars,
            query: reqType,
            isSession: sessionStatus,
        }

    }


    const dataIsSent = (data, sessionStatus: boolean)=> {
        if(!sessionStatus)
            localStorage.setItem('session_id', data.create_CB_Requests_item?.id);

        setErrors(null);
        setNewData(data);
    }



    const tryResendData = (err) => {
        localStorage.removeItem('session_id');

        setNewData(null);
        setErrors(err);

        send(true);

    }


    const newSenderBuilder = (requestType: DocumentNode,
                              callBackVars: OperationVariables) =>{
        return new dataSender(
            client,
            requestType,
            callBackVars,
        )
    }

    const send = (resend?: boolean) => {
            const validToSend = dataIsFilled();
            const query = sessionChecker();
            const sender = newSenderBuilder(query.query, query.vars);

            if(sender && validToSend)
                sender.mutation().then(res => {
                    if(res.data)
                        dataIsSent(res.data, query.isSession);

                    if(res.errors && !resend)
                        tryResendData(res.errors);
                });
    }

    return {
        errors,
        newData,
        send
    };
}

export default useCallRequest;