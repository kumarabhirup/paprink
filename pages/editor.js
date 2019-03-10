import React, { Component } from 'react'
import Head from 'next/head'

import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import EditorPage from '../src/components/Editor'

export default class editorPage extends Component {
  render() {
    return (
      <>
        <Header />
        <Title noSidebar />
        <EditorPage />
        <Footer />
        <Head><script src="/static/prebuilt/js/post_nosidebar.js"></script></Head>
      </>
    )
  }
}
