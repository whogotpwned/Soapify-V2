import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { nhost} from "@/lib/nhostSrc/client/nhostClient";

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: nhost.graphql.httpUrl,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})