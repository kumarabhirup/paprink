import React from 'react'
import { Query } from 'react-apollo'
import User, { CURRENT_USER_QUERY } from './User'
import Router, { withRouter } from 'next/router'

const PleaseSignIn = props => (
  <User>
    {({data: {me}, loading, error}) => {
      loading && <p>Loading...</p>
      if (me) {
        return props.children
      } else if(!loading) {
        props.router.replace(`/signin?intent=${props.router.asPath}`)
      } return <p>Loading...</p>
    }}
  </User>
)

export default withRouter(PleaseSignIn)