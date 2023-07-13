import {useMutation} from "@apollo/client";
import {DocumentNode} from "graphql/language";
import {useCallback, useEffect, useState} from "react";
import {GraphQLError} from "graphql/error";

export const useCartActions = <
        CREATION_DATA_TYPE,
        MUTATION_VARS_TYPE,
    >(
    cartCreationQuery: DocumentNode,
    cartAdderQuery: DocumentNode,
    cartRemoverQuery: DocumentNode,
    cartIdFieldName: keyof MUTATION_VARS_TYPE
) => {
    //  ---- ---- ---- TYPES ---- ---- ----
    type ICreationResolver = (data: CREATION_DATA_TYPE) => string | number;
    type IFailItem = {
        operation: string,
        ex: readonly GraphQLError[],
        calledFnc: (...props: any)=>any,
    }
    //  ---- ---- ---- ACTIONS ---- ---- ----
    const cartSessionObjectKey = "cart_session"


    const [sessionCaratId, setSessionCaratId] = useState<string>();

        // >> ---- ---- ---- EX Handling ---- ---- ----
            const [fails, setFails] = useState<IFailItem[]>([]);

            const addExToList = useCallback((data: IFailItem) => {
                const newExList = [...fails];
                newExList.push({
                    ...data
                })
                setFails(newExList);
            },[fails])

    const [onMutateCart_create, mutatedData_create] =
        useMutation<any, MUTATION_VARS_TYPE>(cartCreationQuery, {
            onError: (ex) => {
                addExToList({
                    operation: "cart creation",
                    ex: ex.graphQLErrors,
                    calledFnc: onMutateCart_create
                })
            }
        })

    const [onMutateCart_add, mutatedData_add] =
        useMutation<any, MUTATION_VARS_TYPE>(cartAdderQuery,
            {
                onError: (ex) => {
                    addExToList({
                        operation: "cart adding",
                        ex: ex.graphQLErrors,
                        calledFnc: onMutateCart_add
                    })
                },
                fetchPolicy: "network-only"
            })

    const [onMutateCart_remove, mutatedData_remove] =
        useMutation<any, MUTATION_VARS_TYPE>(cartRemoverQuery,
            {
                onError: (ex) => {
                    addExToList({
                        operation: "cart remove",
                        ex: ex.graphQLErrors,
                        calledFnc: onMutateCart_remove
                    })
                }
            })

    //

    const getSessionFromLS = useCallback(()=>{
        return typeof window !== 'undefined' && localStorage.getItem(cartSessionObjectKey) ?
            localStorage.getItem(cartSessionObjectKey) :
            null;
    },[window, localStorage])

    const removeCartSession = useCallback(()=>{
        console.log("CLEAR");
    },[window, localStorage])

    useEffect(()=>{
        let _sessionCaratId = getSessionFromLS()
        if(_sessionCaratId)
            setSessionCaratId(_sessionCaratId)
    },[])

    useEffect(()=>{
        let _sessionCaratId = getSessionFromLS();
        if(!_sessionCaratId && sessionCaratId && window)
            localStorage.setItem(cartSessionObjectKey, sessionCaratId)
    },[sessionCaratId, window, localStorage])


    const removeFromCart = async(cartData: MUTATION_VARS_TYPE) => {
        return
    }

    const addToCart = useCallback((
            cartData: MUTATION_VARS_TYPE,
            creationResolver: ICreationResolver
    ) => {

        if(sessionCaratId){
            return onMutateCart_add({
                variables: {
                    ...cartData,
                    [cartIdFieldName]: sessionCaratId,
                }
            })
        }

        else{
            return onMutateCart_create({
                variables: cartData
            }).then((el) => {
                if(el && el.data && !el.errors){
                    if(!creationResolver(el.data))
                        console.warn("Failed to get an ID for a new cart system entry");
                    setSessionCaratId(creationResolver(el.data)?.toString())
            }})
        }

    },[sessionCaratId])


    return {
        fails,
        addToCart,
        getSessionFromLS,
        removeCartSession,
    }

}