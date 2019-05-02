import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
 
import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import Footer from '../src/components/Footer'
import SettingsPage from '../src/components/SettingsPage'
import PleaseSignIn from '../src/components/PleaseSignIn'
import { Loading, QueryFailed } from '../src/components/QueryStatus'
import { meta } from '../src/api/meta'

class settingsPage extends Component {

  state = { 
    
  }

  render() {
    return (
      <>
      <Head><title>User settings - {meta.title}</title></Head>
      <PleaseSignIn>
        { me => (
          <>
          <Header />
          <Title title={me.name} thumbnail={`https://cdn.wallpapersafari.com/99/58/Tn4uob.jpg`} author={me} />
          <SettingsPage user={me} />
          <Footer />
          <Head><script src="/static/prebuilt/js/post_nosidebar.js"></script></Head>
          </>
        ) }
      </PleaseSignIn>
      </>
    )
  }

}

export default withRouter(settingsPage)