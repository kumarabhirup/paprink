import React, { Component } from 'react'
import FacebookAuth from 'react-facebook-auth'
import GoogleLogin from 'react-google-login'
import gql from 'graphql-tag'

import { client } from '../lib/withData'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $socialId: String!
    $fname: String!
    $lname: String!
    $name: String!
    $phone: String
    $email: String!
    $gender: String
    $birthday: String
    $bio: String
    $profilePicture: String!
    $signUpMethod: String!
    $accessToken: String!
  ) {
    signIn(
      signUpMethod: $signUpMethod
      profilePicture: $profilePicture
      socialId: $socialId
      fname: $fname
      lname: $lname
      name: $name
      phone: $phone
      email: $email
      gender: $gender
      birthday: $birthday
      bio: $bio
      accessToken: $accessToken
    ){
      id
      name
      fname
      email
    }
  }
`

const FacebookButton = ({ onClick }) => (
  <a href="#" className="btn-face m-b-20" onClick={onClick}>
    <i className="fa fa-facebook-official"></i>
    Facebook
  </a>
)

export default class LoginPage extends Component {

  authenticateFacebook = async response => {
    console.log(response)
    await client.mutate({
      mutation: SIGNIN_MUTATION,
      variables: { 
        signUpMethod: "facebook",
        profilePicture: response.picture.data.url,
        socialId: response.userID,
        fname: response.first_name,
        lname: response.last_name,
        name: response.name,
        gender: response.gender,
        birthday: response.birthday,
        email: response.email,
        accessToken: response.accessToken
      }
    })
  }

  authenticateGoogle = response => {
    console.log(response)
  }

  render() {
    return (
      <div className="limiter">
        {/* <div className="container-login100" style={{backgroundImage: "url('/static/auth/images/bg-01.jpg')"}}> */}
        <div className="container-login100" style={{backgroundImage: "url('http://fc06.deviantart.com/fs19/i/2007/303/8/2/Oblivion___Wallpaper_by_AKAcorn.jpg')"}}>
          <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
            <form className="login100-form validate-form flex-sb flex-w">
              <span className="login100-form-title p-b-53">
                Sign In to PaprInk
              </span>
              <FacebookAuth
                appId={process.env.FB_LOGIN_APP_ID}
                autoLoad
                fields={"name,first_name,middle_name,last_name,short_name,picture,email,birthday,location,gender,link"}
                callback={this.authenticateFacebook}
                component={FacebookButton}
              />
              <GoogleLogin
                clientId={process.env.GOOGLE_LOGIN_APP_ID}
                render={renderProps => (
                  <a href="#" className="btn-google m-b-20" onClick={renderProps.onClick}>
                    <img src="/static/auth/images/icons/icon-google.png" alt="GOOGLE" />
                    Google
                  </a>
                )}
                scope={"profile email openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.birthday.read"}
                isSignedIn={false}
                fetchBasicProfile={false}
                onSuccess={this.authenticateGoogle}
                onFailure={this.authenticateGoogle}
              />
            </form>
          </div>
        </div>
      </div>
    )
  }

}
