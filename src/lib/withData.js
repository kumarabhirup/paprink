import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: `https://paprink-server.herokuapp.com/graphql`,
  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      }
    })
  }
})

function createClient({ headers }) {

  return new ApolloClient({
    uri: `https://paprink-server.herokuapp.com/graphql`,
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