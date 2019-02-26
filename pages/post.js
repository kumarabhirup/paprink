import React, { Component } from 'react'
import Head from 'next/head'

import Header from '../src/components/Header'
import Title from '../src/components/Title'
import PostPage from '../src/components/PostPage'
import Footer from '../src/components/Footer'

export default class postPage extends Component {
  render() {
    return (
      <>
        <Head>
          <script src="/static/prebuilt/js/post.js"></script>
        </Head>
        <Header />
        <Title />
        <PostPage />
        <Footer />
      </>
    )
  }
}
