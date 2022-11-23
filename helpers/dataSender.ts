import React, {useState} from "react";
import {DocumentNode} from "graphql/language";
import {ApolloClient, ApolloError, NormalizedCacheObject, OperationVariables} from "@apollo/client";
import {GraphQLErrors} from "@apollo/client/errors";

type dataType = {
    refObj: React.MutableRefObject<any | null>;
    required: boolean
}

export interface dataForSend{
    data: Array<dataType>,
    query?: DocumentNode,
    client: ApolloClient<NormalizedCacheObject>,
    variables?: OperationVariables,
}

export class dataSender<T> implements dataForSend{
    client: ApolloClient<NormalizedCacheObject>;
    data: Array<dataType>;
    query: DocumentNode;
    variables: OperationVariables;
    responseSetter: React.Dispatch<any>
    errors: React.Dispatch<GraphQLErrors>

    constructor(
        client: ApolloClient<NormalizedCacheObject>,
        data: Array<dataType>,
        query: DocumentNode,
        variables: OperationVariables,
        responseSetter: React.Dispatch<any>,
        errors: React.Dispatch<GraphQLErrors>
    ) {
        this.data = data;
        this.client = client;
        this.variables = variables;
        this.query = query;
        this.responseSetter = responseSetter;
        this.errors = errors;
    }

    public mutation = async() => {
        let canBeMutate = false;

        this.data.map((elem, i)=>{
            if(elem.refObj.current.value.length < 2 && elem.required){
                elem.refObj.current.classList.add("_input_required");
            }
            else
                canBeMutate = true;
        })

        if(canBeMutate && this.query && this.variables){
            await this.mutate();
        }
        else{
            console.error("CAN NOT SEND REQUEST. CHECK QUERY AND VARIABLES")
        }
    }

    private mutate = async<T>()=>{
        const {errors, data} = await this.client.mutate<T>({
            mutation: this.query,
            variables: this.variables
        });

        if(errors){
            this.errors(errors);
        }
        else {
            this.responseSetter(data);
            // console.log(data);
        }
    }



}

// const dataSender = async<T>(inData: dataForSend) => {
//
//     const {errors, data} = await inData.client.mutate({
//         mutation: inData.query,
//         variables: inData.variables
//
//     });
//
//     inData.data.map((elem, i)=>{
//         if((!elem.objectData || elem.objectData === "") && elem.required){
//             elem.refObj.current.classList.add("_input_required");
//         }
//     })
// }
//
// const mutation = async<T>() =>{
//
// }

