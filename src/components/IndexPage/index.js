import React, { Component } from 'react'
import Head from 'next/head'

import PageContent from '../PageContent'
import Sidebar from '../Sidebar/'
import Today from './Today'
import Trending from './Trending'
import Latest from './Latest'
import Yesterday from './Yesterday'
import User from '../User'
import { meta } from '../../api/meta'

export default class IndexPage extends Component {
  render() {
    return (
      <PageContent>
        <Head>
          <meta name="title" content={`${meta.title} - Where every writer earns.`} />
					<meta name="topic" content={`${meta.title} - Where every writer earns.`} />
					<meta name="subject" content={`${meta.title} - Where every writer earns.`} />
					<meta name="identifier-URL" content={meta.domain} />
					<meta name="robots" content="index,follow" />
					<meta name="description" content={`Best of the date, all up to date!`} />
					<meta name="url" content={`${meta.domain}`} />
					<meta name="rating" content="General" />
					<meta http-equiv="Cache-Control" content="no-cache" />

					<meta property="og:title" content={`${meta.title} - Where every writer earns.`} />
					<meta name="twitter:title" content={`${meta.title} - Where every writer earns.`} />
					<meta property="og:type" content="article" />
					<meta name="twitter:card" content="summary" />
					<meta property="og:url" content={`${meta.domain}`} />
					<meta name="twitter:url" content={`${meta.domain}`} />
					<meta property="og:site_name" content={meta.name} />
					<meta property="fb:app_id" content={process.env.FB_LOGIN_APP_ID} />
					<meta property="og:description" content={`Best of the date, all up to date!`} />
					<meta name="twitter:description" content={`Best of the date, all up to date!`} />
        </Head>
        <User>
          { payload => (
            <>
            { /* PAGE CONTENT */ }
            <div className="col-lg-9">
              <div className="main_content" style={{paddingBottom: "40px"}}>
                
                  <Today user={payload.data && payload.data.me} />
                  <Yesterday user={payload.data && payload.data.me} />
                  <Trending user={payload.data && payload.data.me} />
                  <Latest user={payload.data && payload.data.me} />
              
              </div>
            </div>
            { /* END OF PAGE CONTENT */ }
            <Sidebar />
            </>
          ) }
        </User>
      </PageContent>
    )
  }
}
