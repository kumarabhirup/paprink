import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { BACKEND_SERVER } from './constants'

export const client = new ApolloClient({
  uri: `${BACKEND_SERVER}/graphql`,
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
    uri: `${BACKEND_SERVER}/graphql`,
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