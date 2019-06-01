import React from 'react'
import { Query } from 'react-apollo'
import User, { CURRENT_USER_QUERY } from './User'
import Router, { withRouter } from 'next/router'
import { Loading } from './QueryStatus'

const PleaseSignIn = props => (
  <User>
    {({data: {me}, loading, error}) => {
      loading && <Loading />
      if (me) {
        return props.children(me)
      } else if(!loading) {
        props.router.replace(`/signin?intent=${props.router.asPath}`)
      } 
      return <Loading />
    }}
  </User>
)

export default withRouter(PleaseSignIn)