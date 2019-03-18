import React from 'react'
import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from './User'
import Router, { withRouter } from 'next/router'

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>
      if (!data.me) {
        props.router.replace(`/signin?intent=${props.router.asPath}`)
      }
      return props.children
    }}
  </Query>
)

export default withRouter(PleaseSignIn)