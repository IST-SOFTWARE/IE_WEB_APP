import {ApolloClient, InMemoryCache} from "@apollo/client";
const graphQLAPI  = process.env.NEXT_PUBLIC_GRAPHQL

export const apolloClient = new ApolloClient({
    uri: graphQLAPI,
    cache: new InMemoryCache(),
})
