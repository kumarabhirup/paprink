import React, { Component } from 'react'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'

import LoginPage from '../src/components/LoginPage'
import User, { CURRENT_USER_QUERY, getMe, getCurrentUser } from '../src/components/User'
import { meta } from '../src/api/meta'

class loginPage extends Component {

  static async getInitialProps({ res, req }) {
    if (res) {
      Router.replace(Router.query.intent || '/')
    } else {
      Router.push('http://example.com')
    }
    return {}
  }

  async UNSAFE_componentWillMount() {
    // console.log(this.props.me)
    // if(this.props.me.data){
    //   this.props.router.replace(this.props.router.query.intent || '/')
    // }
  }

  render() {
    return (
      <>
        <Head>
          <script dangerouslySetInnerHTML={{__html: `
            window.fbAsyncInit = function() {
              FB.init({
                appId      : '${process.env.FB_LOGIN_APP_ID}',
                cookie     : true,
                xfbml      : true,
                version    : '${process.env.FB_LOGIN_APP_VERSION}'
              });
              FB.AppEvents.logPageView();  
            };
            (function(d, s, id){
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {return;}
              js = d.createElement(s); js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `}}></script>
        </Head>
        <LoginPage />
      </>
    )
  }

}

export default withRouter(loginPage)