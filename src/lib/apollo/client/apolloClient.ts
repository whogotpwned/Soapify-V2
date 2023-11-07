import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client/core'
import {setContext} from '@apollo/client/link/context';
import {createApolloProvider} from '@vue/apollo-option'
import {nhost} from "@/lib/nhostSrc/client/nhostClient";


// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: nhost.graphql.httpUrl,
})

// Cache implementation
const cache = new InMemoryCache()

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('soapifyAccessToken');

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers, authorization: token ? `Bearer ${token}` : "",
        }
    }
});

// Create the apollo client
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink), cache,
})

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})