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

        </Head>
        <Header />
        <Title title={`What is ${meta.title}?`} thumbnail={`https://cdn.wallpapersafari.com/99/58/Tn4uob.jpg`} />
        <AboutPage />
        <Footer />
      </>
    )
  }

}

export default withRouter(aboutPage)