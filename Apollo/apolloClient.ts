import {ApolloClient, InMemoryCache} from "@apollo/client";
import {IProductItem} from "../components/UI/ISTProductItem/common";
const graphQLAPI  = process.env.NEXT_PUBLIC_GRAPHQL

export const apolloClient = new ApolloClient({
    uri: graphQLAPI,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    Products: {
                        keyArgs: false,
                        merge: (
                            existing: IProductItem[],
                            incoming: IProductItem[], { args: {
                                offset
                            }}) => {

                            const merged =
                                existing && offset !== 0 ?
                                    existing.slice(0) :
                                    [];

                            for (let i = 0; i < incoming.length; ++i) {
                                merged[offset + i] = incoming[i];
                            }

                            return merged;
                        }
                    },

                    //    ...

                }
            }
        }
    }),
})
