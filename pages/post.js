import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Header from '../src/components/Header/'
import Title from '../src/components/Title'
import PostPage from '../src/components/PostPage'
import Footer from '../src/components/Footer'
import { Loading, QueryFailed } from '../src/components/QueryStatus'
import User from '../src/components/User'

export const GET_POST_QUERY = gql`
  query GET_POST_QUERY($slugParam: String!){
    getPost(slugParam: $slugParam) {
      id
      title
      editorCurrentContent
      editorSerializedOutput
      status
      slug
      upvotesNumber
      author {
        id
        name
        lname
        fname
        username
        profilePicture
        previledge
        email
      }
      thumbnail
      categories {
        id
        text
        category
      }
      upvotes {
        id
        user {
          id
        }
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
`

class postPage extends Component {
  render() {
    return (
      <>
      <Head>

        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/bootstrap4/bootstrap.min.css" />
        <link href="/static/prebuilt/plugins/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.theme.default.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/OwlCarousel2-2.2.1/animate.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/plugins/jquery.mb.YTPlayer-3.1.12/jquery.mb.YTPlayer.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post.css" />
        <link rel="stylesheet" type="text/css" href="/static/prebuilt/styles/post_responsive.css" />

        <script src="/static/prebuilt/js/jquery-3.2.1.min.js"></script>
        <script src="/static/prebuilt/styles/bootstrap4/popper.js"></script>
        <script src="/static/prebuilt/styles/bootstrap4/bootstrap.min.js"></script>
        <script src="/static/prebuilt/plugins/OwlCarousel2-2.2.1/owl.carousel.js"></script>
        <script src="/static/prebuilt/plugins/easing/easing.js"></script>
        <script src="/static/prebuilt/plugins/masonry/masonry.js"></script>
        <script src="/static/prebuilt/plugins/parallax-js-master/parallax.min.js"></script>
        <script src="/static/prebuilt/js/post.js"></script>

      </Head>
      <User>
        { userPayload => (
          <Query query={GET_POST_QUERY} variables={{ slugParam: this.props.router.query.slug }}>
            { payload => {

                if(payload.loading) {
                  return <Loading />
                }

                if (payload.data && payload.data.getPost) {

                  const { title, thumbnail, categories } = payload.data.getPost

                  return (
                    <>
                      <Header />
                      <Title title={title} tags={categories} thumbnail={thumbnail.blackOverlayImage} />
                      <PostPage postData={payload.data.getPost} user={userPayload.data && userPayload.data.me} />
                      <Footer />
                    </>
                  )

                } else {
                  return (
                    <QueryFailed />
                  )
                }

              }
            }
          </Query>
        ) }
      </User>
      </>
    )
  }
}

export default withRouter(postPage)