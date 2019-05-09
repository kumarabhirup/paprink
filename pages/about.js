import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
 
import Header from '../src/components/Header'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import { meta } from '../src/api/meta'
import AboutPage from '../src/components/AboutPage'

class aboutPage extends Component {

  state = { 
    
  }

  render() {
    return (
      <>
        <Head>

          <title>{meta.meta_ogTitle}</title>

          <meta name="title" content={meta.meta_ogTitle} />
					<meta name="topic" content={meta.meta_ogTitle} />
					<meta name="subject" content={meta.meta_ogTitle} />
					<meta name="identifier-URL" content={meta.domain} />
					<meta name="robots" content="index,follow" />
					<meta name="description" content={meta.meta_description} />
					<meta name="url" content={`${meta.domain}/about`} />
					<meta name="rating" content="General" />
					<meta http-equiv="Cache-Control" content="no-cache" />

					<meta property="og:title" content={meta.meta_ogTitle} />
					<meta name="twitter:title" content={meta.meta_ogTitle} />
					<meta property="og:type" content="article" />
					<meta name="twitter:card" content="summary" />
					<meta property="og:url" content={`${meta.domain}/about`} />
					<meta name="twitter:url" content={`${meta.domain}/about`} />
          <meta property="og:image" content={meta.image} />
				  <meta name="twitter:image" content={meta.image} />
					<meta property="og:site_name" content={meta.name} />
					<meta property="fb:app_id" content={process.env.FB_LOGIN_APP_ID} />
					<meta property="og:description" content={meta.meta_description} />
					<meta name="twitter:description" content={meta.meta_description} />

					<link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/bootstrap4/bootstrap.min.css" />
          <link href="/static/prebuilt/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.theme.default.css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/animate.css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/jquery.mb.YTPlayer-3.1.12/jquery.mb.YTPlayer.css" />
					<link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar.css" />
          <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_nosidebar_responsive.css" />

          <script src="/static/prebuilt/js/jquery-3.2.1.min.js"></script>
          <script src="/static/prebuilt/styles/bootstrap4/popper.js"></script>
          <script src="/static/prebuilt/styles/bootstrap4/bootstrap.min.js"></script>
          <script src="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.js"></script>
          <script src="/static/prebuilt/plugins/easing/easing.js"></script>
          <script src="/static/prebuilt/plugins/masonry/masonry.js"></script>
          <script src="/static/prebuilt/plugins/parallax-js-master/parallax.min.js"></script>
          <script src="/static/prebuilt/js/post_nosidebar.js"></script>

        </Head>
        <Header />
        <Title title={`What is ${meta.title}?`} thumbnail={`https://i.ibb.co/1bxgbyB/home-banner.jpg`} />
        <AboutPage />
        <Footer />
      </>
    )
  }

}

export default withRouter(aboutPage)