import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { client } from '../lib/withData'

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      fname
      lname
      email
      phone
      bio
      previledge
      gender
      username
      birthday
      profilePicture
      signUpMethod
    }
  }
`

export const getMe = async client => {
  const me = await client.query({
    query: CURRENT_USER_QUERY
  })
  return me
}

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => {
      console.log(payload)
      return props.children(payload)
    }}
  </Query>
)

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User