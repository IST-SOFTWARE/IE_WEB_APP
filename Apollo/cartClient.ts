import {ApolloClient, InMemoryCache} from "@apollo/client";
import {IProductItem} from "../components/UI/ISTProductItem/common";
const graphQLAPI  = process.env.NEXT_PUBLIC_GRAPHQL

export const cartClient = new ApolloClient({
    uri: graphQLAPI,
    cache: new InMemoryCache(),
})
