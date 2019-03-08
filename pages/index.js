import React, { Component } from 'react'

import { meta } from '../src/api/meta'
import Header from '../src/components/Header/'
import HomeSlider from '../src/components/HomeSlider'
import IndexPage from '../src/components/IndexPage/'
import Footer from '../src/components/Footer'

export default class homePage extends Component {
  render() {
    return (
      <>
        <Header />
        <HomeSlider />
        <IndexPage />
        <Footer />
      </>
    )
  }
}