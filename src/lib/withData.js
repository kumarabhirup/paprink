import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: `${process.env.ENDPOINT}/graphql`,
  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      }
    }),
    headers
  }
})

function createClient({ headers }) {

  return new ApolloClient({
    uri: `${process.env.ENDPOINT}/graphql`,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers
      })
    }
  })

}

export default withApollo(createClient);