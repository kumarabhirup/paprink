import React, { Component } from 'react'
import Head from 'next/head'

import Header from '../src/components/Header/'
import IndexPage from '../src/components/IndexPage/'
import Footer from '../src/components/Footer'
import Landing from '../src/components/Landing'

export default class homePage extends Component {
  render() {
    return (
      <>
        <Head>

          <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/bootstrap4/bootstrap.min.css" />
          <link href="/static/prebuilt/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.theme.default.css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/animate.css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/jquery.mb.YTPlayer-3.1.12/jquery.mb.YTPlayer.css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/main_styles.css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/responsive.css" />

          <script src="/static/prebuilt/js/jquery-3.2.1.min.js" defer></script>
          <script src="/static/prebuilt/styles/bootstrap4/popper.js" defer></script>
          <script src="/static/prebuilt/styles/bootstrap4/bootstrap.min.js" defer></script>
          <script src="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.js" defer></script>
          <script src="/static/prebuilt/plugins/jquery.mb.YTPlayer-3.1.12/jquery.mb.YTPlayer.js" defer></script>
          <script src="/static/prebuilt/plugins/easing/easing.js" defer></script>
          <script src="/static/prebuilt/plugins/masonry/masonry.js" defer></script>
          <script src="/static/prebuilt/plugins/masonry/images_loaded.js" defer></script>
          <script src="/static/prebuilt/js/custom.js" defer></script>

        </Head>
        <Header />
        <Landing />
        <IndexPage />
        <Footer />
      </>
    )
  }
}