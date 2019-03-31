import React, { Component } from 'react'

import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import AuthorPage from '../src/components/AuthorPage'

export default class authorPage extends Component {
  render() {
    return (
      <>
        <Header />
        <Title />
        {/* <AuthorPage /> */}
        <h2 style={{padding: "70px 50px"}}>Page Under Construction....</h2>
        <Footer />
      </>
    )
  }
}
