import React, { Component } from 'react'
import Head from 'next/head'

import Header from '../src/components/Header'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import CategoryPage from '../src/components/CategoryPage'

export default class categoryPage extends Component {
  render() {
    return (
      <>
        <Head>
          <script src="/static/prebuilt/js/category.js"></script>
        </Head>
        <Header />
        <Title />
        <CategoryPage />
        <Footer />
      </>
    )
  }
}
