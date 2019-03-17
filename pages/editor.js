import React, { Component } from 'react'
import Head from 'next/head'

import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import EditorPage from '../src/components/Editor'

export default class editorPage extends Component {

  state = { 
    title: null,
    images: {}
  }

  render() {
    return (
      <>
        <Header />
        <Title noSidebar title={this.state.title} tags={this.state.categories} thumbnail={this.state.images.uploading === 'done' && this.state.images.blackOverlayImage} />
        <EditorPage titleState={async title => await this.setState({ title })} categoryState={async categories => await this.setState({ categories })} imageState={async images => await this.setState({ images })} />
        <Footer />
        <Head><script src="/static/prebuilt/js/post_nosidebar.js"></script></Head>
      </>
    )
  }

}
