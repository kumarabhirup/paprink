import React, { Component } from 'react'
import Head from 'next/head'
import LoginPage from '../src/components/LoginPage'

export default class loginPage extends Component {
  render() {
    return (
      <>
        <LoginPage />
        <Head>
          <script src="/static/auth/vendor/animsition/js/animsition.min.js"></script>
          <script src="/static/auth/vendor/select2/select2.min.js"></script>
          <script src="/static/auth/vendor/daterangepicker/moment.min.js"></script>
          <script src="/static/auth/vendor/daterangepicker/daterangepicker.js"></script>
          <script src="/static/auth/vendor/countdowntime/countdowntime.js"></script>
          <script src="/static/auth/js/main.js"></script>
        </Head>
      </>
    )
  }
}
