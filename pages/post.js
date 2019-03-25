import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import PostPage from '../src/components/PostPage'
import Footer from '../src/components/Footer'

const GET_POST_QUERY = gql`
  query GET_POST_QUERY($slugParam: String!){
    getPost(slugParam: $slugParam)
  }
`

class postPage extends Component {
  render() {
    return (
      <Query query={GET_POST_QUERY} variables={{ slugParam: this.props.router.query.slug }}>
        { payload => {

            if(payload.loading) {
              return <div style={{width: '98%', textAlign: 'center', maxWidth: '1000px', margin: '50px auto'}}>Loading...</div>
            }

            if (payload.data && payload.data.getPost) {

              const { title, thumbnail, categories } = payload.data.getPost

              return (
                <>
                  <Head>
                    <script src="/static/prebuilt/js/post.js"></script>
                  </Head>
                  <Header />
                  <Title title={title} tags={categories} thumbnail={thumbnail.blackOverlayImage} />
                  <PostPage postData={payload.data.getPost} />
                  <Footer />
                </>
              )

            } else {
              return (
                <div style={{width: '98%', textAlign: 'center', maxWidth: '1000px', margin: '50px auto'}}>You and your mind seems to be lost. 🐡</div>
              )
            }

          }
        }
      </Query>
    )
  }
}

export default withRouter(postPage)