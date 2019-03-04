import React, { Component } from 'react'
import Head from 'next/head'
import LoginPage from '../src/components/LoginPage'

export default class loginPage extends Component {
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
