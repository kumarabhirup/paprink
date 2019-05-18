import React from 'react'
import { Query } from 'react-apollo'
import User, { CURRENT_USER_QUERY } from './User'
import Router, { withRouter } from 'next/router'
import { Loading, QueryFailed } from './QueryStatus'

const PleaseSignIn = props => (
  <User>
    {({data: {me}, data, loading, error}) => {
      loading && <Loading />
      if (me) {
        return props.children(me)
      } else if(!loading) {
        // props.router.replace(`/signin?intent=${props.router.asPath}`)
        return <p>Please Sign In.</p>
      } 
      return <Loading />
    }}
  </User>
)

export default withRouter(PleaseSignIn)