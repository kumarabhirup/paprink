import React, { Component } from 'react'

export default class LoginPage extends Component {
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
              <a href="#" className="btn-face m-b-20">
                <i className="fa fa-facebook-official"></i>
                Facebook
              </a>
              <a href="#" className="btn-google m-b-20">
                <img src="/static/auth/images/icons/icon-google.png" alt="GOOGLE" />
                Google
              </a>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
