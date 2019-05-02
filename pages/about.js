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
      <Head><title>What's {meta.title}?</title></Head>
        <Header />
        <Title title={`What is ${meta.title}?`} thumbnail={`https://cdn.wallpapersafari.com/99/58/Tn4uob.jpg`} />
        <AboutPage />
        <Footer />
      </>
    )
  }

}

export default withRouter(aboutPage)