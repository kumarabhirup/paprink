import ApolloClient, { InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import withApollo from 'next-with-apollo'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState, headers) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  console.log("headers:" + headers)
  return new ApolloClient({
    uri: `${process.env.ENDPOINT}/graphql`, // Server URL (must be absolute)
    credentials: 'include', // Additional fetch() options like `credentials` or `headers`,
    headers,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers
      })
    },
    cache: new InMemoryCache().restore(initialState || {})
  })
}

// export default function initApollo (initialState, headers) {
//   // Make sure to create a new client for every server-side request so that data
//   // isn't shared between connections (which would be bad)
//   if (!process.browser) {
//     return create(initialState, headers)
//   }

//   // Reuse client on the client-side
//   if (!apolloClient) {
//     apolloClient = create(initialState, headers)
//   }

//   return apolloClient
// }

export function returnApollo (initialState, headers) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, headers)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, headers)
  }

  return apolloClient
}

export default withApollo(({ ctx, headers, initialState }) => {
  console.log(initialState)
  if (!process.browser) {
    return create(initialState, headers)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, headers)
  }

  return apolloClient

})