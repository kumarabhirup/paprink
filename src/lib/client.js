import { withApollo } from 'next-with-apollo'

function getClient({ client }) {
  return client
}

export default withApollo(getClient)