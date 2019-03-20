import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
 
import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import EditorPage from '../src/components/Editor'
import PleaseSignIn from '../src/components/PleaseSignIn'

class editorPage extends Component {

  state = { 
    title: null,
    images: {}
  }

  isNew = () => {
    if (this.props.router.query.postId === 'new') {
      return true
    }
    return false
  }

  render() {
    if(this.isNew()){
      return (
        <PleaseSignIn>
          { me => (
            <>
            <Header />
            <Title noSidebar title={this.state.title} tags={this.state.categories} thumbnail={this.state.images.uploading === 'done' && this.state.images.blackOverlayImage} currentUser={me} />
            <EditorPage titleState={async title => await this.setState({ title })} categoryState={async categories => await this.setState({ categories })} imageState={async images => await this.setState({ images })} />
            <Footer />
            <Head><script src="/static/prebuilt/js/post_nosidebar.js"></script></Head>
            </>
          ) }
        </PleaseSignIn>
      )
    }
    return (
      <div style={{width: '98%', textAlign: 'center', maxWidth: '1000px', margin: '50px auto'}}>You and your mind seems to be lost. 🐡</div>
    )
  }

}

export default withRouter(editorPage)