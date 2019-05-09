import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
 
import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import SettingsPage from '../src/components/SettingsPage'
import PleaseSignIn from '../src/components/PleaseSignIn'
import { Loading, QueryFailed } from '../src/components/QueryStatus'
import { meta } from '../src/api/meta'

class settingsPage extends Component {

  state = { 
    
  }

  render() {
    return (
      <>
      <Head>

        <title>User settings - {meta.title}</title>
        <meta name="robots" content="nofollow, noindex" />

        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/bootstrap4/bootstrap.min.css" />
        <link href="/static/prebuilt/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.theme.default.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/animate.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/jquery.mb.YTPlayer-3.1.12/jquery.mb.YTPlayer.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar_responsive.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/react-day-picker/lib/style.css" />

        <script src="/static/prebuilt/js/jquery-3.2.1.min.js"></script>
        <script src="/static/prebuilt/styles/bootstrap4/popper.js"></script>
        <script src="/static/prebuilt/styles/bootstrap4/bootstrap.min.js"></script>
        <script src="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.js"></script>
        <script src="/static/prebuilt/plugins/easing/easing.js"></script>
        <script src="/static/prebuilt/plugins/masonry/masonry.js"></script>
        <script src="/static/prebuilt/plugins/parallax-js-master/parallax.min.js"></script>
        <script src="/static/prebuilt/js/post_nosidebar.js"></script>

      </Head>
      <PleaseSignIn>
        { me => (
          <>
          <Header />
          <Title title={me.name} thumbnail={`https://i.ibb.co/1bxgbyB/home-banner.jpg`} author={me} />
          <SettingsPage user={me} />
          <Footer />
          {/* <Head><script src="/static/prebuilt/js/post_nosidebar.js"></script></Head> */}
          </>
        ) }
      </PleaseSignIn>
      </>
    )
  }

}

export default withRouter(settingsPage)