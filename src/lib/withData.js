import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

function createClient({ headers }) {

  return new ApolloClient({
    uri: `http://kumar-backend.herokuapp.com/graphql`,
    request: operation => {
      operation.setContext({
        /* fetchOptions: {
          credentials: 'include',
        }, */
        headers
      })
    }
  })

}

export default withApollo(createClient);