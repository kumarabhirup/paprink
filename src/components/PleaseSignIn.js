import React from 'react'
import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from './User'
import Router from 'next/router'

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>
      if (!data.me) {
        Router.replace(`/signin?intent=${Router.asPath}`)
      }
      return props.children
    }}
  </Query>
)

export default PleaseSignIn